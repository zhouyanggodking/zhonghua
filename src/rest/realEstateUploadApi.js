import axios from 'axios';
import Qs from 'qs';
import {formatQuery} from '@/helpers/formatGetParams';

export const getOcrExtractTemplateFields = (businessTypeId, userId, id)=> {
  return axios.get(`/OcrExtractTemplateFields/OcrExtractTemplateFields?businessTypeId=${businessTypeId}&userId=${userId}&id=${id}`)
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}

export const updateOcrExtractTemplateFields = (data) => {
  return axios.post('/OcrExtractTemplateFields/OcrExtractTemplateFields', data)
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}

export const deleteTemplateField = (id) => {
  return axios.get(`/OcrExtractTemplateFields/deleteOcrExtractTemplateFields?id=${id}`)
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}
// 文件上传
export const uploadFile = (param) => {
  return axios.post('/uploader/chunk', param)
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}
// 合并文件
export const relocateFile = (params) => {
  return axios.post('/uploader/relocate', Qs.stringify(params))
  .then(res => {
    return res.data;
  }, err => {
    return Promise.reject(err);
  })
}
// 文件是否存在
export const fileIsExist = (params) => {
  return axios.get(`/uploader/getFileByIdentifier${formatQuery(params)}`)
  .then(res => {
    return res.data;
  }, err => {
    return Promise.reject(err);
  })
}
// 上传历史
export const getUploadHistory = (params) => {
  return axios.get(`/uploader/history${formatQuery(params)}`)
  .then(res => {
        return res.data || [];
    }, () => {
        return []
    })
}
// 一个付款申请单下的所有发票
export const getTotalInvoices = (params) => {
  return axios.get(`/estate/estateInvoiceController/getInvoiceInfosWithPosition${formatQuery(params)}`)
  .then((res) => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  })
}
// 发票关联付款主题
export const getSimpleInfos = (userid) => {
  return axios.get(`/estate/estatePaymentRequestOrderController/getAllPaymentRequestSimpleInfos?userId=${userid}`)
  .then((res) => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  })
}
//修改发票
export const modifyInvoice = (params) => {
  return axios.post('/estate/estateInvoiceController/modifyInvoice', params)
  .then(res => {
    return res.data;
  }, err => {
    return Promise.reject(err);
  })
}
//修改发票已用金额 
export const modifyInvoiceUsedprice = (params) => {
  return axios.post('/estate/estateInvoiceController/modifyInvoiceUsedPrice', params)
  .then(res => {
    return res.data;
  }, err => {
    return Promise.reject(err);
  })
}
// 发票补录
//提交验真
export const verifyInvoice = (params) => {
  return axios.post('/estate/estateInvoiceController/verificateInvoice', params)
  .then(res => {
    return res.data;
  }, err => {
    return Promise.reject(err);
  })
}
//验真后的补录
export const supplyInvoice = (params) => {
  return axios.post('/estate/estateInvoiceController/addInvoice', params)
  .then(res => {
    return res.data;
  }, err => {
    return Promise.reject(err);
  })
}
//单个付款申请单审核和驳回
export const checkPaymentRequestOrder = (params) => {
  return axios.post('/estate/estatePaymentRequestOrderController/checkPaymentRequestOrder', params)
  .then((res) => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  })
}

//付款申请单批量审核

export const checkPaymentRequestOrders = (params) => {
  return axios.post('/estate/estatePaymentRequestOrderController/checkPaymentRequestOrders', params)
  .then((res) => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  })
}

// 发票原件

export const getInvoiceInfo = (params) => {
  return axios.get(`/estate/estateInvoiceController/getInvoiceInfo${formatQuery(params)}`)
  .then((res) => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  })
}

//提交任务
export const startOcrJob = (params) => {
  return axios.post(`/OcrJobs/startOcrJob?originalFileId=${params.originalFileId}&userId=${params.userId}&businessTypeId=${params.businessTypeId}`, params.ocrExtractTemplateFieldsDtos)
  .then(res => {
    return Promise.resolve(res.data);
  }, err => {
    return Promise.reject(err);
  });
}