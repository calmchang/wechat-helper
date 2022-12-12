## wechat-helper

![Page Views Count](https://badges.toozhao.com/badges/01GM1ZE00DX1SXQGT2WDKJM2GG/green.svg)

![node](https://img.shields.io/badge/node-%3E%3D8-green) ![npm](https://img.shields.io/badge/npm-%3E%3D6.4.1-blue) ![umd](https://img.shields.io/badge/umd-support-brightgreen) ![esmodule](https://img.shields.io/badge/esmodule-support-brightgreen)

### install  
`npm install wechat-helper`

### usage

```javascript
import wxHelper from "wechat-helper";

//global
//var wechatHelper =  window['wechatHelper'].default || window['wechatHelper'];

wxHelper.init({
  onSuccess:()=>{

  },
  onFail:()=>{

  },
  hideMenuList:[],
  apis:[],
  apiSign:async (url)=>{
    let req = await axios.get('/yourApi', {
      params: {
        url,
        appId:'yourAppId'
      }
    });
    return {
      appId:req.data.appId,
      timestamp:req.data.timestamp,
      nonceStr:req.data.nonceStr,
      signature:req.data.signature,
    };
  },
  apiGetUserInfo:async (code)=>{
    let req = await axios.get('/yourApi', {
      params: {
        code,
        appId:'yourAppId'
      }
    });
    console.log(req);
  }
})

// 分享
wxHelper.setShare({
  title:'分享文案设置',
  desc:'详情内容设置',
  imgUrl:'',
  link:'',
  success:()=>{
  }
});   

//授权
let authInfo= wxHelper.getAuth(true);
if(authInfo.needAuth){
  location.replace(authInfo.url);
  return;
}else{
  //获取用户信息
  let req = await wxHelper.getUserInfo(authInfo.code);
  console.log(req)
}

```

### API

#### init   
* appId: 如果需要页面授权则必须传入appId  
* apiSign: (url)=>Promise({appId,timestamp,nonceStr,signature})  
* apiGetUserInfo: (code)=>Promise(response)  
* apis?: [],需要开通的api列表,默认值:    
  ```javascript
  [
    'updateAppMessageShareData',
    'updateTimelineShareData',
    'onMenuShareAppMessage',
    'onMenuShareTimeline',
    'hideOptionMenu',
    'hideMenuItems',
    'onMenuShareWeibo',
    'onMenuShareQZone'
  ] 
  ```  
* hideMenuList?: [],需要隐藏的菜单
* onSuccess?: ()=>void,初始化成功回调  
* onFai?l: ()=>void,初始化失败回调  
* debug?: bool,调试模式,默认值:false  



> apiSign接口参考 [微信文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62)


> hideMenuList、apis值参考[微信文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
