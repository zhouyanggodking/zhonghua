import axios from 'axios';
import localStorageHelper from '@/helpers/localStorageHelper';
// const USERID = 'USERID' //用户id
// const USERNAME = 'USERNAME' //用户名
// const TELEPHONE = 'TELEPHONE' //电话号码
// const ROLEID = "ROLEID"  //角色ID  1->管理员  0-> 其他用户
// const USERSTATUS = 'USERSTATUS' //冻结状态：1->正常  0->冻结

//登录
export const login = (params)=> {
  return axios.get(`http://10.17.20.121:8080/sys/ocr/user/login?telephone=${params.telephone}&password=${params.password}`)
  //return axios.get(`finance/ocr/user/login?userName=${params.telephone}&passWord=${params.password}`)
  .then( res=> {
    var flag = '0'; //登录标识
    if(res.data.status == '200') {
      var data = res.data.data;
      if(data.status == '0') {
        flag = '1'; //用户冻结状态
      }else{
        localStorageHelper.setItem("USERID", data.id);
        localStorageHelper.setItem("USERNAME", data.username);
        localStorageHelper.setItem("TELEPHONE", data.telephone);
        localStorageHelper.setItem("ROLEID", data.ROLEID);  
        localStorageHelper.setItem("USERSTATUS", data.status);    
        flag = '2'; //用户正常登录
      }
    }
    return flag;
  }, (err) => {
    localStorageHelper.removeItem("USERID");
    localStorageHelper.removeItem("USERNAME");
    localStorageHelper.removeItem("TELEPHONE");
    localStorageHelper.removeItem("ROLEID");  
    localStorageHelper.removeItem("USERSTATUS");
    return Promise.reject(err)
  })
}
//退出登陆
export const logout = ()=> {
  return axios.get(`/`)
  .then( res=> {
    localStorageHelper.removeItem("USERID");
    localStorageHelper.removeItem("USERNAME");
    localStorageHelper.removeItem("TELEPHONE");
    localStorageHelper.removeItem("ROLEID");  
    localStorageHelper.removeItem("USERSTATUS");
    return res.data;
  }, (err) => {
    localStorageHelper.removeItem("USERID");
    localStorageHelper.removeItem("USERNAME");
    localStorageHelper.removeItem("TELEPHONE");
    localStorageHelper.removeItem("ROLEID");  
    localStorageHelper.removeItem("USERSTATUS");
    return Promise.reject(err)
  })
}