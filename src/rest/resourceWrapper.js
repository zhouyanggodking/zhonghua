import axios from 'axios';

export default class resourceWrapper {
    static test() {
        return axios.get();
    }
    static paymentDetailsPage(userId, id) {

        return axios.post('/estatePaymentRequestOrderController/getPaymentRequestOrderInfo', {
            'userId': userId,
            'id': id
        }, {
            // headers: {
            //     'Content-type': 'x-www-form-urlencoded'
            // }
        }, ).then(res => {
            return res.data;
        }, (err) => {
            return Promise.reject(err)
        })
    }
}