import axios from 'axios';
import localStorageHelper from '@/helpers/localStorageHelper';
const USERID = 'USERID' // 用户id
const USERNAME = 'USERNAME' // 用户名
const TELEPHONE = 'TELEPHONE' // 电话号码

// 登录
export const login = (params)=> {
  return axios.get(`http://10.17.20.121:8080/sys/ocr/user/login?telephone=${params.telephone}&password=${params.password}`)
  .then(res => {
    // 登录标识
    var flag = ''; 
    if(res.data.status == '104'){
      flag = 'phoneError'; //账号不存在
    } else if (res.data.status == '200'){
      //用户名或密码错误
      if (res.data.data.hasOwnProperty('num')) {      
        if (res.data.data.status == '1') {
          flag = 'locked'; //登录6次锁定
        } else {
          flag = 'numerror'; // 错误少于6次
        }
      } else {
        if (res.data.data.status == '0') {
          flag = 'freeze'; //冻结用户
        } else {
          localStorageHelper.setItem(USERID, res.data.data.id);
          localStorageHelper.setItem(USERNAME, res.data.data.username);
          localStorageHelper.setItem(TELEPHONE, res.data.data.telephone);    
          flag = 'success'; // 用户正常登录
        }
      }
    }
    var resData = {
      type: flag,
      data: res.data.data
    }
    return resData;
  }, (err) => {
    localStorageHelper.removeItem(USERID);
    localStorageHelper.removeItem(USERNAME);
    localStorageHelper.removeItem(TELEPHONE);
    return Promise.reject(err)
  })
}
// 退出登陆
export const logout = ()=> {
  return axios.get(`/`)
  .then(res=> {
    localStorageHelper.removeItem(USERID);
    localStorageHelper.removeItem(USERNAME);
    localStorageHelper.removeItem(TELEPHONE);
    return res.data;
  }, (err) => {
    localStorageHelper.removeItem(USERID);
    localStorageHelper.removeItem(USERNAME);
    localStorageHelper.removeItem(TELEPHONE);
    return Promise.reject(err)
  })
}