import axios from 'axios';
import Qs from 'qs';

//获取手机验证码
export const getPhoneVerifyCode = (params)=> {
  return axios.get(`?telephone=${params.telephone}`)
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}

//忘记密码
export const resetPassword = (params)=> {
  return axios.get(`/finance/ocr/user/updatePassword?password=${params.newPassword}&telephone=${params.telephone}`)
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}

//修改密码
export const changePassword = (params)=> {
  //return axios.get(`/finance/ocr/user/updatePassword?pwd=${params.oldPassword}&newpwd=${params.newPassword}&id=${params.userId}`)
  return axios.get(`http://10.17.20.121:8080/sys/ocr/changePassword?password=${params.oldPassword}&newpassword=${params.newPassword}&telephone=${params.telephone}`)
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
    //return axios.get(`http://10.17.20.121:8080/sys/ocr/user/query?username=${params.userName}&telephone=${params.phoneNum}&pageSize=${params.pageSize}&pageNum=${params.pageNum}`)
    return axios.get(`http://10.17.20.121:8080/sys/ocr/user/query?username=${params.userName}&telephone=${params.phoneNum}&deptId=${params.department}&aclId=${params.authority}&pageSize=${params.pageSize}&pageNum=${params.pageNum}`)    
    .then(res => {
      console.log("函数返回的结果", res)
      if(res.data.data.data.length > 0){
        
      }
      return res.data.data.data;
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

  
