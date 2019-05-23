import axios from 'axios';
// import Qs from 'qs';
import {formatQuery} from '@/helpers/formatGetParams';

export const getEstateElecAuthorizationSummaryInfos = (params)  => {
  return axios.get(`/auth/estateAuthorizationSummaryController/getEstateElecAuthorizationSummaryInfos${formatQuery(params)}`)
  .then(res => {
    return res.data;
  }, err => {
    return Promise.reject(err);
  })
}

// 查询清单
export const elecDetailList = (params) => {
  return axios.get(`/auth/estateAuthorizationExcelController/getEstateAuthorizationExcelInfos${formatQuery(params)}`)
  .then(res => {
    return res.data.data || [];
  }, err => {
    return Promise.reject(err);
  })
}
//清单单个详情
export const getEstateAuthorizationExcelInfo = (params) => {
  return axios.get(`/auth/estateAuthorizationExcelController/getEstateAuthorizationExcelInfo${formatQuery(params)}`)
  .then(res => {
    return res.data.data || [];
  }, err => {
    return Promise.reject(err);
  })
}
// 获取智罗盘信息
export const getDatabusMsg = (params) => {
  return axios.get(`/auth/estateAuthorizationExcelController/getCompanyInfoFromDatabus${formatQuery(params)}`)
  .then(res => {
    return res.data.data || [];
  }, err => {
    return Promise.reject(err);
  })
}

//批量审核 
export const checkAuthRecords = (params) => {
  return axios.post('/auth/estateAuthorizationExcelController/checkAuthorizationRecords', params)
  .then(res => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  })
}
//单条审核驳回
export const checkAuthRecord = (params) => {
  return axios.post('/auth/estateAuthorizationExcelController/checkAuthorizationRecord', params)
  .then((res) => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  })
}
//获取电子或纸质版文件信息
export const getFileMessage = (params) => {
  return axios.get(`/auth/estateAuthorizationFileController/getEstateAuthorizationFileInfo${formatQuery(params)}`)
  .then(res => {
    return res.data.data || [];
  }, err => {
    return Promise.reject(err);
  });
}
//修改电子或纸质版文件信息
export const modifyFileMessage = (params) => {
  return axios.post('/auth/estateAuthorizationFileController/modifyOneFile', params)
  .then(res => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  });
}
//修改电子版时间
export const modifyEleFileDate = (params) => {
  return axios.post('/auth/estateAuthorizationFileController/modifyElecFileAuthrizationDate', params)
  .then(res => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  });
}
