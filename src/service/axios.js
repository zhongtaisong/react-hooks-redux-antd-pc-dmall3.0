import axios from "axios";
import { message } from 'antd';
// import router from '@router';
// 全局设置
import { $url, $globalCloseTime } from '@config';
// 全局公共方法
import { loading } from '@utils';

// 路由拦截
// router.beforeEach((to, from, next) => {

//     const { meta } = to || {};
//     const { title, requiresAuth } = meta || {};
//     // 用户名
//     let uname = sessionStorage.getItem('uname') || localStorage.getItem('uname');
//     // // token
//     let token = sessionStorage.getItem('token');

//     // 动态设置标签页标题
//     document.title = title || 'vue';
//     if(!uname || !token) {
//         if(requiresAuth) {
//             Message({
//                 type: 'error',
//                 message: '很抱歉，尚未登录，无法访问！0001'
//             });
//             next({ name: 'login' });
//         }
//     }
//     next();
// })

// http拦截
const $axios = axios.create({
    baseURL: $url,
    timeout: 60 * 1000,
    withCredentials: true
});

// 添加请求拦截器
$axios.interceptors.request.use(
    config => {

        loading.showLoading('显示loading');

        // 用户名
        let uname = sessionStorage.getItem('uname') || localStorage.getItem('uname');
        // token
        let token = sessionStorage.getItem('token');
        const headers = {
            type: 'vue'
        };
        if(uname) {
            headers['uname'] = uname;
        }
        if(token) {
            headers['token'] = token;
        }
        config.headers = headers;

        return config;
    }, 
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
$axios.interceptors.response.use(
    response => {
        const { data={}, config={} } = response || {};

        if( data ){
            loading.hideLoading('隐藏loading');
            data.msg && message.success(data.msg, $globalCloseTime);          
        }
        return response;
    }, 
    error => {
        const { config: { url }, code } = error || {};
        if( code == 'ECONNABORTED' ){
            message.error(`${ url } 加载超时！`);
        }
        if (error.response) {
            const { data={}, status, request: { responseURL } } = error.response || {};
            switch (status) {
                case 400:
                    data.msg && message.error(data.msg);
                    break;
                case 401:
                    message.error('很抱歉，尚未登录，无法访问！');
                    // router.push({ name: 'login', query: {
                    //     from: router.currentRoute.path
                    // } })
                    break;
                case 404:
                    message.error(data.msg || '出错啦！');
                    break;
                default:
                    message.error('网络连接失败，请重试！');
            }
        }

        loading.hideLoading('隐藏loading');
        return Promise.reject(error);
    }
);

export default $axios;