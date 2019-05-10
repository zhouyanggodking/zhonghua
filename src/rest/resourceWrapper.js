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
}