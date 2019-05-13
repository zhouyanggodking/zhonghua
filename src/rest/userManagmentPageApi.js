import axios from 'axios';
import Qs from 'qs';
//获取权限列表
export const getAuthorityList = ()=> {
    return axios.get(``)
    .then(res => {
      return res.data;
    }, (err) => {
      return Promise.reject(err)
    })
  }
//获取部门列表
export const getDepartmentList = ()=> {
    return axios.get(`?`)
    .then(res => {
      return res.data;
    }, (err) => {
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
export const addNewUserField = (params)=> {
    return axios.post('', Qs.stringify({
        'userId': params.userId, //登录者
        'name': params.name, //新增用户：姓名
        'phoneNum': params.phoneNum, //新增用户：手机号
        'department': params.department, //新增用户：权限
        'authority': params.authority, //新增用户：权限
    }))
    .then(res => {
      return res.data;
    }, (err) => {
      return Promise.reject(err)
    })
  }

//变更用户
export const updateAccountField = (params)=> {
    return axios.post('', Qs.stringify({
        'userId': params.userId, //登录者
        'id': params.id,
        'name': params.name, //新增用户：姓名
        'phoneNum': params.phoneNum, //新增用户：手机号
        'department': params.department, //新增用户：权限
        'authority': params.authority, //新增用户：权限
    }))
    .then(res => {
      return res.data;
    }, (err) => {
      return Promise.reject(err)
    })
  }
  
