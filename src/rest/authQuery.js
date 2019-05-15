import axios from 'axios';
import localStorageHelper from '@/helpers/localStorageHelper';

//登录
export const login = (params)=> {
  return axios.get(`http://10.17.20.121:8080/sys/ocr/user/login?telephone=${params.telephone}&password=${params.password}`)
  //return axios.get(`finance/ocr/user/login?userName=${params.telephone}&passWord=${params.password}`)
  .then( res=> {
    var flag = false;
    if(res.data.status == '200'){
      const data = res.data.data;
      localStorageHelper.setItem("userId", data.id);
      localStorageHelper.setItem("userName", data.username);
      localStorageHelper.setItem("telephone", data.telephone);
      localStorageHelper.setItem("userStatus", data.status);
        flag =true;
    }
    return flag;
  }, (err) => {
    localStorageHelper.removeItem("userId");
    localStorageHelper.removeItem("userName");
    localStorageHelper.removeItem("userStatus");
    return Promise.reject(err)
  })
}
//退出登陆
export const logout = ()=> {
  return axios.get(`/`)
  .then( res=> {
    localStorageHelper.removeItem("userId");
    localStorageHelper.removeItem("userName");
    localStorageHelper.removeItem("userStatus");
    return res.data;
  }, (err) => {
    localStorageHelper.removeItem("userId");
    localStorageHelper.removeItem("userName");
    localStorageHelper.removeItem("userStatus");
    return Promise.reject(err)
  })
}