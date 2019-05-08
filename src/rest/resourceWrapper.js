import axios from 'axios';
// import Qs from 'qs';

export default class resourceWrapper {
    static test() {
        return axios.get();
    }
    static getPaymentDetailsPage(userId, id) {

        return axios.get(`/estatePaymentRequestOrderController/getPaymentRequestOrderInfo?userId=${userId}&id=${id}` ).then(res => {
            return res.data;
        }, (err) => {
            return Promise.reject(err)
        })
    }

    static getPaymentOrderInfos(userId, pageNum,pageSize) {

        return axios.get(`/estatePaymentRequestOrderController/getPaymentRequestOrderInfos?userId=${userId}&pageNum=${pageNum}&pageSize=${pageSize}` ).then(res => {
            return res.data;
        }, (err) => {
            return Promise.reject(err)
        })
    }
}