import axios from 'axios';
// import Qs from 'qs';

export default class resourceWrapper {
    static test() {
        return axios.get();
    }
    static getPaymentDetailsPage(userId, id) {

        return axios.get(`/estate/estatePaymentRequestOrderController/getPaymentRequestOrderInfo?userId=${userId}&id=${id}` ).then(res => {
            return res.data;
        }, (err) => {
            return Promise.reject(err)
        })
    }

    static getPaymentOrderInfos(params) {
      return axios.get(`/estate/estatePaymentRequestOrderController/getPaymentRequestOrderInfos?userId=${params.userId}&pageNum=${params.pageNum}&pageSize=${params.pageSize}&paymentTitle=${params.paymentTitle}&contractNo=${params.contractNo}&payer=${params.payer}&receiver=${params.receiver}&auditState=${params.auditState}` ).then(res => {
          return res.data;
      }, (err) => {
          return Promise.reject(err)
      })
    }
    // 获取付款申请单信息
    static getPaymentOrderDetail(params) {
      return axios.get(`/estate/estatePaymentRequestOrderController/getPaymentRequestOrderInfo?id=${params.id}&userId=${params.userId}`)
      .then(res => {
        return res.data;
      }, err => {
        return Promise.reject(err);
      })
    }
    // 获取当前付款申请单下的所有发票
    static getInvoicesByPaymentOrder(params) {
      return axios.get(`/estate/estateInvoiceController/getInvoiceInfos?&userId=${params.userId}&paymentRequestOrderId=${params.paymentRequestOrderId}&pageNum=${params.pageNum}&pageSize=${params.pageSize}`)
      .then(res => {
        return res.data;
      }, err => {
        return Promise.reject(err);
      })
    }
    static modifyPaymentOrder(params) {
      return axios.post('/estate/estatePaymentRequestOrderController/modifyPaymentRequestOrder', params)
      .then(res => {
        return res.data;
      }, err => {
        return Promise.reject(err);
      })
    }
}