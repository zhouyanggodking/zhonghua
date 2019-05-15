import axios from 'axios';
import Qs from 'qs';

//获取手机验证码
export const getPhoneVerifyCode = (params)=> {
  return axios.get(``)
  .then(res => {
    const data = res.data.data;
    //保存验证码
    console.log("验证码正确返回", res)
    return res.data;
  }, (err) => {
    console.log("验证码错误返回")
    return Promise.reject(err)
  })
}

//忘记密码
export const resetPassword = (params)=> {
  return axios.get(`/finance/ocr/user/updatePassword?password=${params.newPassword}&telephone=${params.telephone}`)
  .then(res => {
    console.log("忘记密码正确返回", res)
    return res.data;
  }, (err) => {
    console.log("忘记密码错误返回")
    return Promise.reject(err)
  })
}

//修改密码
export const changePassword = (params)=> {
  //return axios.get(`/finance/ocr/user/updatePassword?pwd=${params.oldPassword}&newpwd=${params.newPassword}&id=${params.userId}`)
  return axios.get(`/finance/ocr/user/updatePassword?oldPassword=${params.oldPassword}&password=${params.newPassword}&id=${params.userId}`)
  .then(res => {
    console.log("修改密码正确返回", res)
    return res.data;
  }, (err) => {
    console.log("修改密码错误返回")
    return Promise.reject(err)
  })
}

//查询用户列表
export const getUserList = (params)=> {
    return axios.get(`?userName=${params.userName}&pageSize=${params.pageSize}&pageNum=${params.pageNum}`)
    .then(res => {
      return res.data;
    }, (err) => {
      return Promise.reject(err)
    })
  }

//新增用户
export const addNewUserAccount = (params)=> {
    return axios.post('', Qs.stringify({
        'userId': params.userId, //登录者
        'name': params.name, //姓名
        'phoneNum': params.phoneNum, //手机号
        'department': params.department, //部门
        'authority': params.authority, //权限
    }))
    .then(res => {
      return res.data;
    }, (err) => {
      return Promise.reject(err)
    })
  }

//变更用户
export const updateUserAccount= (params)=> {
    return axios.post('', Qs.stringify({
        'userId': params.userId, //登录者
        'id': params.id,
        'name': params.name, //变更用户：姓名
        'phoneNum': params.phoneNum, //变更用户：手机号
        'department': params.department, //变更用户：权限
        'authority': params.authority, //变更用户：权限
    }))
    .then(res => {
      return res.data;
    }, (err) => {
      return Promise.reject(err)
    })
  }

//冻结用户
export const freezeUserAccount= (params)=> {
  return axios.post('', Qs.stringify({
      'userId': params.userId, //登录者
      'id': params.id
  }))
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}

//导出excel
export const exportUserToExcel= (params)=> {
  return axios.post('', Qs.stringify({
      'userId': params.userId, //登录者
      'id': params.id
  }))
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}

  
