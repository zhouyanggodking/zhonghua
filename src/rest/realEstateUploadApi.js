import axios from 'axios';
// import Qs from 'qs';
export const getOcrExtractTemplateFields = (businessTypeId, userId, id)=> {
  return axios.get(`/OcrExtractTemplateFields/OcrExtractTemplateFields?businessTypeId=${businessTypeId}&userId=${userId}&id=${id}`)
  .then(res => {
    return res.data;
  }, (err) => {
    return Promise.reject(err)
  })
}