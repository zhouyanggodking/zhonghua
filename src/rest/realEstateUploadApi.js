import axios from 'axios';
import Qs from 'qs';

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
// 查询文件是否已经存在
export const fileIsExist = (params) => {
  return axios.get(`/uploader/selectMd5?md5?=${params}`)
  .then(res => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  })
}

// 合并文件
export const relocateFile = (params) => {
  return axios.post('/uploader/relocate', Qs.stringify(params))
  .then(res => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  })
}
export const getUploadHistory = (params) => {
  return axios.get(`/uploader/hostory?businessTypeId=${params.businessTypeId}&relatedUserId=${params.relatedUserId}&pageSize=${params.pageSize}&pageNum=${params.pageNum}&type=${params.type}&userId=${params.userId}`)
  .then(res => {
        return res.data;
    }, (err) => {
        return Promise.reject(err)
    })
}
// 一个付款申请单下的所有发票
export const getTotalInvoices = (params) => {
  return axios.get(`/estate/estateInvoiceController/getInvoiceInfosWithPosition?userId=${params.userId}&paymentRequestId=${params.paymentRequestId}`)
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
export const supplyInvoice = (params) => {
  return axios.post('/estate/estateInvoiceController/addOneInvoice', params)
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
  return axios.get(`/estate/estateInvoiceController/getInvoiceInfo?userId=${params.userId}&id=${params.id}`)
  .then((res) => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  })
}

//下载table数据
// export const openPostWindow = (url, name, params) => {
//   const tempForm = document.createElement("form");
//   tempForm.id = "tempForm";
//   tempForm.method = "post";
//   // tempForm.enctype = "multipart/form-data";
//   tempForm.action = url;
//   tempForm.target = name;
//   const keys = Object.keys(params);
//   const values = Object.values(params);
//   keys.forEach((item, index) => {
//       let hideInput = document.createElement("input");
//       hideInput.type = "hidden";
//       hideInput.name= item;
//       hideInput.value = values[index];
//       tempForm.appendChild(hideInput);
//   });
//   if(document.all){
//       tempForm.attachEvent("onsubmit",function(){});        //IE
//   }else{
//       const subObj = tempForm.addEventListener("submit",function(){},false);    //firefox
//   }
//   document.body.appendChild(tempForm);
//   if(document.all){
//       tempForm.fireEvent("onsubmit");
//   }else{
//       tempForm.dispatchEvent(new Event("submit"));
//   }
//   tempForm.submit();
//   document.body.removeChild(tempForm);
// }