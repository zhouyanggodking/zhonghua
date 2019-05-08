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

export const uploadFile = (param) => {
  return axios.post('/uploader/chunk', param)
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}

export const getUploadHistory = (params) => {
  return axios.get(`/uploader/hostory?businessTypeId=${params.businessTypeId}&userId=${params.userId}&pageSize=${params.pageSize}&pageNum=${params.pageNum}`)
  .then(res => {
        return res.data;
    }, (err) => {
        return Promise.reject(err)
    })
}