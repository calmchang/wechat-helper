import { GET_WECHAT_SIGN } from './action.js';
// import './main.scss';

RegExp.prototype.execAll = function (str) {
  let map = {};
  let result = null;
  do {
    result = this.exec(str);
    if (result) map[result[1]] = result[2];
  } while (this.lastIndex != 0);
  return map;
};

class WechatHelper {
  constructor(options) {
    const {wxid,appId,apis,hideMenuList,onSuccess,onFail,debug} = options;
    this.ver = '0.0.1';
    this.wxid = wxid;
    this.appId = appId;
    this.wxApiReady = false;
    this.shareList = [];
    this.apis = apis||[
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'hideOptionMenu',
      'hideMenuItems',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ];
    this.init({wxid,appId,apis,hideMenuList,onSuccess,onFail,debug})
  }

  init(options) {
    const {wxid,appId,apis,hideMenuList,onSuccess,onFail,debug=false} = options;
    if (this.inWechat()) {
      let spt = document.createElement('script');
      spt.type = 'text/javascript';
      spt.onload = async () => {
        let ret = await GET_WECHAT_SIGN({ wxid:wxid, url: location.href.split('#')[0] });
        
        if (ret) {
          console.log(`[wechat-helper]jsapi签名结果:${JSON.stringify(ret)}`);
          wx.ready(()=> {
            console.log('[wechat-helper]jsapi wx ready');
            this.wxApiReady = true;
            if(hideMenuList){
              wx.hideMenuItems({
                menuList: hideMenuList,
              });
            }
            if (this.shareList && this.shareList.length > 0) {
              this.setShare(this.shareList.pop());
            }
            if(onSuccess){
              onSuccess();
            }

          });
          wx.error( (res)=> {
            console.log(`[wechat-helper]jsapi wx fail:${JSON.stringify(res)}`);
            if (onFail) {
              onFail('微信初始化失败:' + JSON.stringify(res));
            }
          });
          wx.config({
            debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，公众号的唯一标识
            timestamp: ret.timestamp, // 必填，生成签名的时间戳
            nonceStr: ret.nonceStr, // 必填，生成签名的随机串
            signature: ret.signature, // 必填，签名
            jsApiList:apis, // 必填，需要使用的JS接口列表
          });
          
        }else{
          console.log('[wechat-helper]jsapi签名失败');
        }
      };
      spt.src = location.protocol + '//res.wx.qq.com/open/js/jweixin-1.6.0.js';
      document.body.appendChild(spt);
    }else{
      console.log('[wechat-helper]请到微信浏览器进行jsapi申请');
    }
  }

  setShare(options) {
    const { title, desc, link, imgUrl, success } = options;
    if (this.wxApiReady) {
      console.log(`[wechat-helper]设置分享内容:${JSON.stringify(options)}`);
      wx.updateAppMessageShareData({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success,
      });
      wx.updateTimelineShareData({
        title, // 分享标题
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success,
      });
      wx.onMenuShareWeibo({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success,
      }); 
    } else {
      console.log(`[wechat-helper]设置分享内容-未加载延迟设置:${JSON.stringify(options)}`);
      this.shareList.pop();
      this.shareList.push(options);
    }
  }

  getSearch(url) {
    if (!url) url = location.href;
    let search = /([^&?#]+)=([^&?#]+)/g.execAll(url);
    for (let key in search) {
      if (Object.prototype.hasOwnProperty.call(search, key)) {
        search[key] = window.encodeURIComponent(search[key]);
      }
    }
    return search;
  }

  inWechat() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
  toRedirect() {
    let req = this.getSearch();
    console.log(`[wechat-helper]toRedirect跳转页面:${req.redirect}`);
    location.replace(req.redirect);
  }
  toAuth(url, needHead) {
    const { appId } = this;
    let type = 'snsapi_base';
    if (needHead) {
      type = 'snsapi_userinfo';
    }
    let redirect_uri = window.encodeURIComponent(url);
    let wxAuth = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=${type}&state=wxauthsuccess#wechat_redirect`;
    return wxAuth;
  }
  
  getAuth(needHead) {
    let req = this.getSearch();
    if(this.inWechat() ){
      if ( !req.code || !req.state || req.state != 'wxauthsuccess') {
        let wxAuth = this.toAuth(location.href, needHead);
        console.log(`[wechat-helper]还未授权，即将前往:${wxAuth}`);
        return { needAuth: true, url: wxAuth };
      } else {
        console.log(`[wechat-helper]已授权，code:${req.code}`);
        return { needAuth: false,code:req.code };
      }
    }else{
      console.log('[wechat-helper]请在微信浏览器运行');
    }
    return { needAuth: false };
  }

  
}

export default WechatHelper;
