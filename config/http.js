import axios from 'axios'
// import qs from 'qs'
const Qs = require('qs');
// import store from '../src/store/store';
import Vue from 'vue'
import Router from './../src/router/index.js'
const vm=new Vue()
axios.defaults.timeout =100000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.headers.get["Content-Type"] =  "application/x-www-form-urlencoded;charset=UTF-8";

axios.defaults.withCredentials = true; //让ajax携带cookie
axios.defaults.baseURL = 'http://127.0.0.1:8080/march';   //配置接口地址 开发环境

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if(config.method  === 'post'){
        // console.log(config,typeof config.data)
            // if(config.url.indexOf('submitOrder')>0){
               
            // }else{
                config.data = Qs.stringify(config.data);
            // }
        
    }
    // if(config.url='/jd/order/submitOrder'){
            
    // }else{
    return config;
},(error) =>{
    //  _.toast("错误的传参", 'fail');
    vm.$message({
        message:'错误的传参',
        type: 'error'
    });
    return Promise.reject(error);
});
 
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事  
        // console.log(store.state.index.token)
    
    return res;
}, (error) => {

    if(error.message=="Network Error"){
        Router.push({name:'/login'})
        return Promise.reject('网络异常');
    }else{
        return Promise.reject(error);
    }
    

});

class Axios {
    get(url, param) {//get请求
        return new Promise((resolve, reject) => {
            axios.get(url, {params: param})
                .then(response => {
                    resolve(response.data)
                }, err => {
                    reject(err)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    post(url, params) { //POST请求
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                   reject(error)
                })
        })
    }

    upLoad(url,params){
        return new Promise((resolve,reject) => {
            axios({
                url: url,
                data: params,
                method: 'post',
                headers: { 
                 'Content-Type': 'multipart/form-data'
                }
 
            }).then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
        })
    }
}

export default new Axios()
// //返回一个Promise(发送post请求)
// export function fetchPost(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, params)
//             .then(response => {
//                 resolve(response.data);
//             }, err => {
//                 reject(err);
//             })
//             .catch((error) => {
//                reject(error)
//             })
//     })
// }
// ////返回一个Promise(发送get请求)
// export function fetchGet(url, param) {
//     return new Promise((resolve, reject) => {
//         axios.get(url, {params: param})
//             .then(response => {
//                 resolve(response.data)
//             }, err => {
//                 reject(err)
//             })
//             .catch((error) => {
//                 reject(error)
//             })
//     })
// }