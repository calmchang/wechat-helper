// import axios from 'axios';
// import qs from 'qs';


export function GET_DEFAULT(url,params){
  return new Promise((res,rej)=>{
    var xhr = new XMLHttpRequest();
    var data=[];
    if(params){
      for(let key in params){
        data.push(`${window.encodeURIComponent(key)}=${window.encodeURIComponent(params[key])}`);
      }
      data=data.join('&');
    }
    var onreadystatechange=function(){
      if(xhr.readyState===4){
        if(xhr.status===200){
          res(JSON.parse(xhr.response));
        }else{
          rej();
        }
      }
    }
    url = data?`${url}?${data}`:url;
    xhr.open('GET',url,true);
    xhr.onreadystatechange=onreadystatechange;
    xhr.send(null);
  })
  
}

// async function GET_DEFAULT(url, param) {
//   if (param) param = qs.stringify(param, { arrayFormat: 'indices' });

//   let response = await axios({
//     method: 'get',
//     url: param ? `${url}?${param}` : url,
//   });
//   return response && response.data ? response.data : null;
// }

async function GET_DEFAULT_CROSS(url, param) {
  if (param) param = qs.stringify(param, { arrayFormat: 'indices' });

  let response = await axios({
    method: 'get',
    xsrfCookieName: '',
    xsrfHeaderName: '',
    withCredentials: true,
    url: param ? `${url}?${param}` : url,
  });
  return response && response.data ? response.data : null;
}

/**************************************************************************
 *                  基础共享接口
 *************************************************************************/

// const HOST = 'https://m.vuedata.cn';
// export async function GET_WECHAT_SIGN(params={
//   wxid:'',
//   url:'',

// }) {
//   return GET_DEFAULT(HOST + '/ndapp/wx/jsApiSign', params);
// }


// export async function GET_USER_INFO(params={wxid:'',code:''}){
//   return GET_DEFAULT(HOST + '/ndapp/wx/getUserInfo', params);
// }