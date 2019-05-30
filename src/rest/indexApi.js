import axios from "axios";
import {formatQuery} from '@/helpers/formatGetParams';

export const getFileCounts = (params) => {
  return axios.get(`/uploader/ocrUploadAndRecognizeCount${formatQuery(params)}`)
  .then(res => {
    return res.data.data || []
  }, err => {
    return Promise.reject(err);
  })
}