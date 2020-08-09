import * as axios from 'axios';

const mainHttp = axios.create({
    baseURL: '/',
    timeout: 3000,
    withCredentials: true
});

export { mainHttp };