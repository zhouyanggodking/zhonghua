import axios from 'axios';

export const getEstateElecAuthorizationSummaryInfos = (params)  => {
  return axios.get(`/auth/estateAuthorizationSummaryController/getEstateElecAuthorizationSummaryInfos?startTime=${params.startTime}&endTime=${params.endTime}&state=${params.state}&userId=${params.userId}&elecOrFile=${params.elecOrFile}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`)
  .then(res => {
    return res.data;
  }, err => {
    return Promise.reject(err);
  })
}