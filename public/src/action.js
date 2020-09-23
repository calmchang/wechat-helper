import axios from 'axios';
import qs from 'qs';

async function GET_DEFAULT(url, param) {
  if (param) param = qs.stringify(param, { arrayFormat: 'indices' });

  let response = await axios({
    method: 'get',
    url: param ? `${url}?${param}` : url,
  });
  return response && response.data ? response.data : null;
}

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

const HOST = 'https://m.vuedata.cn';
export async function GET_WECHAT_SIGN(params={
  wxid:'testcalm',
  url:'',

}) {
  return GET_DEFAULT(HOST + '/ndapp/wx/jsApiSign', params);
}
