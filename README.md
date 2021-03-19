
![node](https://img.shields.io/badge/node-%3E%3D8-green)
![npm](https://img.shields.io/badge/npm-%3E%3D6.4.1-blue)



### install  
`npm install wechat-helper`

### usage

```javascript
import wxHelper from 'wechat-helper';
//var wechatHelper =  window['wechatHelper'].default || window['wechatHelper'];

var helper = new wechatHelper({
  wxid:'',
  appId:''
});

// 分享
helper.setShare({
  title:'分享文案设置',
  desc:'详情内容设置',
  imgUrl:'',
  link:'',
  success:()=>{
  }
});   

//授权
let authInfo= helper.getAuth(true);
if(authInfo.needAuth){
  location.replace(authInfo.url);
  return;
}else{
  helper.getUserInfo(authInfo.code,(data)=>{
    console.log(data);
  });
}


```
