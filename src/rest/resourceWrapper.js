import axios from 'axios';

export default class resourceWrapper{
    static test(){
        return axios.get();
    }
}