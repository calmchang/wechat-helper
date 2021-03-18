(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wechat-helper"] = factory();
	else
		root["wechat-helper"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/action.js
// import axios from 'axios';
// import qs from 'qs';
function GET_DEFAULT(url, params) {
  return new Promise((res, rej) => {
    var xhr = new XMLHttpRequest();
    var data = [];

    if (params) {
      for (let key in params) {
        data.push(`${window.encodeURIComponent(key)}=${window.encodeURIComponent(params[key])}`);
      }

      data = data.join('&');
    }

    var onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          res(JSON.parse(xhr.response));
        } else {
          rej();
        }
      }
    };

    url = data ? `${url}?${data}` : url;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = onreadystatechange;
    xhr.send(null);
  });
} // async function GET_DEFAULT(url, param) {
//   if (param) param = qs.stringify(param, { arrayFormat: 'indices' });
//   let response = await axios({
//     method: 'get',
//     url: param ? `${url}?${param}` : url,
//   });
//   return response && response.data ? response.data : null;
// }


async function GET_DEFAULT_CROSS(url, param) {
  if (param) param = qs.stringify(param, {
    arrayFormat: 'indices'
  });
  let response = await axios({
    method: 'get',
    xsrfCookieName: '',
    xsrfHeaderName: '',
    withCredentials: true,
    url: param ? `${url}?${param}` : url
  });
  return response && response.data ? response.data : null;
}
/**************************************************************************
 *                  基础共享接口
 *************************************************************************/


const HOST = 'https://m.vuedata.cn';
async function GET_WECHAT_SIGN(params = {
  wxid: '',
  url: ''
}) {
  return GET_DEFAULT(HOST + '/ndapp/wx/jsApiSign', params);
}
// CONCATENATED MODULE: ./src/main.js
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

class main_WechatHelper {
  constructor(options) {
    const {
      wxid,
      appId,
      apis,
      hideMenuList,
      onSuccess,
      onFail,
      debug
    } = options;
    this.ver = '0.0.1';
    this.wxid = wxid;
    this.appId = appId;
    this.wxApiReady = false;
    this.shareList = [];
    this.apis = apis || ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'hideOptionMenu', 'hideMenuItems', 'onMenuShareWeibo', 'onMenuShareQZone'];
    this.init({
      wxid,
      appId,
      apis,
      hideMenuList,
      onSuccess,
      onFail,
      debug
    });
  }

  init(options) {
    const {
      wxid,
      appId,
      apis,
      hideMenuList,
      onSuccess,
      onFail,
      debug = false
    } = options;

    if (this.inWechat()) {
      let spt = document.createElement('script');
      spt.type = 'text/javascript';

      spt.onload = async () => {
        let ret = await GET_WECHAT_SIGN({
          wxid: wxid,
          url: location.href.split('#')[0]
        });

        if (ret) {
          console.log(`[wechat-helper]jsapi签名结果:${JSON.stringify(ret)}`);
          wx.ready(() => {
            console.log('[wechat-helper]jsapi wx ready');
            this.wxApiReady = true;

            if (hideMenuList) {
              wx.hideMenuItems({
                menuList: hideMenuList
              });
            }

            if (this.shareList && this.shareList.length > 0) {
              this.setShare(this.shareList.pop());
            }

            if (onSuccess) {
              onSuccess();
            }
          });
          wx.error(res => {
            console.log(`[wechat-helper]jsapi wx fail:${JSON.stringify(res)}`);

            if (onFail) {
              onFail('微信初始化失败:' + JSON.stringify(res));
            }
          });
          wx.config({
            debug: debug,
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId,
            // 必填，公众号的唯一标识
            timestamp: ret.timestamp,
            // 必填，生成签名的时间戳
            nonceStr: ret.nonceStr,
            // 必填，生成签名的随机串
            signature: ret.signature,
            // 必填，签名
            jsApiList: apis // 必填，需要使用的JS接口列表

          });
        } else {
          console.log('[wechat-helper]jsapi签名失败');
        }
      };

      spt.src = location.protocol + '//res.wx.qq.com/open/js/jweixin-1.6.0.js';
      document.body.appendChild(spt);
    } else {
      console.log('[wechat-helper]请到微信浏览器进行jsapi申请');
    }
  }

  setShare(options) {
    const {
      title,
      desc,
      link,
      imgUrl,
      success
    } = options;

    if (this.wxApiReady) {
      console.log(`[wechat-helper]设置分享内容:${JSON.stringify(options)}`);
      wx.updateAppMessageShareData({
        title,
        // 分享标题
        desc,
        // 分享描述
        link,
        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl,
        // 分享图标
        success
      });
      wx.updateTimelineShareData({
        title,
        // 分享标题
        link,
        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl,
        // 分享图标
        success
      });
      wx.onMenuShareWeibo({
        title,
        // 分享标题
        desc,
        // 分享描述
        link,
        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl,
        // 分享图标
        success
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
    const {
      appId
    } = this;
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

    if (this.inWechat()) {
      if (!req.code || !req.state || req.state != 'wxauthsuccess') {
        let wxAuth = this.toAuth(location.href, needHead);
        console.log(`[wechat-helper]还未授权，即将前往:${wxAuth}`);
        return {
          needAuth: true,
          url: wxAuth
        };
      } else {
        console.log(`[wechat-helper]已授权，code:${req.code}`);
        return {
          needAuth: false,
          code: req.code
        };
      }
    } else {
      console.log('[wechat-helper]请在微信浏览器运行');
    }

    return {
      needAuth: false
    };
  }

}

/* harmony default export */ var main = (main_WechatHelper);
// CONCATENATED MODULE: ./src/index.js

/* harmony default export */ var src = __webpack_exports__["default"] = (main);

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map