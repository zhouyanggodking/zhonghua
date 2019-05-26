import axios from 'axios';
import Qs from 'qs';
axios.defaults.withCredentials = true;

//获取手机验证码
export const getPhoneVerifyCode = (params)=> {
  return axios.get(`http://10.17.20.121:8080/sys/ocr/user/sendMessageVerification?telephone=${params.telephone}`)
  .then(res => {
    var errorFlag = false;
    if (res.data.message == '该用户不存在！') {
      errorFlag = true;
    }
    return errorFlag;
  }, (err) => {
    return Promise.reject(err)
  })
}
//验证手机验证码
export const verifyTelephoneCode = (params)=> {
  return axios.get(`http://10.17.20.121:8080/sys/ocr/user/checkMessageVerification?messageCode=${params.messageCode}&telephone=${params.telephone}`)
  .then(res => {
    var flag = false;
    if(res.data.status == '200' && res.data.message == 'success'){
      flag = true;
    }
    return flag;
  }, (err) => {
    return Promise.reject(err)
  })
}
//忘记密码
export const resetPassword = (params)=> {
  return axios.post('http://10.17.20.121:8080/sys/ocr/user/forgetPassword', Qs.stringify(params))
  .then(res => {
    var flag = false;
    if(res.data.status == '200'){
      flag = true;
    }
    return flag;
  }, (err) => {
    return Promise.reject(err)
  })
}

//修改密码
export const changePassword = (params)=> {
  return axios.post('http://10.17.20.121:8080/sys/ocr/changePassword', Qs.stringify(params))
  .then(res => {
    var flag = false;
    if(res.data.status == '200'){
      flag = true;
    }
    return flag;
  }, (err) => {
    return Promise.reject(err)
  })
}

//查询用户列表
export const getUserList = (params)=> {
  return axios.get(`http://10.17.20.121:8080/sys/ocr/user/queryUser?username=${params.username}&telephone=${params.telephone}&deptId=${params.deptId}&aclId=${params.aclId}&pageSize=${params.pageSize}&pageNum=${params.pageNum}`)    
  .then(res => {
    return res.data.data;
  }, (err) => {
    return Promise.reject(err)
  })
}

//新增用户
export const addNewUserAccount = (params)=> {
  return axios.post('http://10.17.20.121:8080/sys/ocr/user/addUser', Qs.stringify(params, { indices: false }))
  .then(res => {
    var flag = false;
    if(res.data.status == '200'){
      flag = true;
    }
    return flag;
  }, (err) => {
    return Promise.reject(err)
  })
}

//变更用户
export const updateUserAccount= (params)=> {
  return axios.post('http://10.17.20.121:8080/sys/ocr/user/updateUser',  Qs.stringify(params ,{ indices: false }))
  .then(res => {
    var flag = false;
    if(res.data.status == '200'){
      flag = true;
    }
    return flag;
  }, (err) => {
    return Promise.reject(err)
  })
}

//冻结、解冻用户
export const freezeUserAccount= (params)=> {
  return axios.post('http://10.17.20.121:8080/sys/ocr/user/updateUserStatus', Qs.stringify(params))
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}


  
