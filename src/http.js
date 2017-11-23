import axios from 'axios'
import router from './routes.js'
var token = JSON.parse(sessionStorage.getItem('token'));
// axios 配置
axios.defaults.timeout = 5000;
// http request 拦截器
axios.interceptors.request.use(
    config => {
        alert(123)
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        alert(123)
        return response;
    },
    error => {
        alert(123)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;