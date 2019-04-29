import axios from 'axios';
import Qs from 'qs';

export default class resourceWrapper {
    static test() {
        return axios.get();
    }
    static paymentDetailsPage(userId, id) {

        return axios.post('/estatePaymentRequestOrderController/getPaymentRequestOrderInfo', Qs.stringify({
          'userId': userId,
          'id': id
      }), {
            headers: {
              'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }, ).then(res => {
            return res.data;
        }, (err) => {
            return Promise.reject(err)
        })
    }
}