import axios from 'axios';
import localStorageHelper from '@/helpers/localStorageHelper';
const USERID = 'USERID'
const USERNAME = 'USERNAME'
const TELEPHONE = 'TELEPHONE'
const USERSTATUS = 'USERSTATUS' //用户是否冻结

//登录
export const login = (params)=> {
  return axios.get(`http://10.17.20.121:8080/sys/ocr/user/login?telephone=${params.telephone}&password=${params.password}`)
  //return axios.get(`finance/ocr/user/login?userName=${params.telephone}&passWord=${params.password}`)
  .then( res=> {
    var flag = false;
    if(res.data.status == '200'){
      const data = res.data.data;
      localStorageHelper.setItem("USERID", data.id);
      localStorageHelper.setItem("USERNAME", data.username);
      localStorageHelper.setItem("TELEPHONE", data.telephone);
      localStorageHelper.setItem("USERSTATUS", data.status);
        flag =true;
    }
    return flag;
  }, (err) => {
    localStorageHelper.removeItem("USERID");
    localStorageHelper.removeItem("USERNAME");
    localStorageHelper.removeItem("TELEPHONE");
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
    localStorageHelper.removeItem("USERSTATUS");
    return res.data;
  }, (err) => {
    localStorageHelper.removeItem("USERID");
    localStorageHelper.removeItem("USERNAME");
    localStorageHelper.removeItem("TELEPHONE");
    localStorageHelper.removeItem("USERSTATUS");
    return Promise.reject(err)
  })
}