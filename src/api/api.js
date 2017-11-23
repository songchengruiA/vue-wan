import axios from 'axios';
var qs=require('qs');

let base = '';

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//  创建预备竞猜
//  请求赛事
var instance = axios.create({
    headers: {'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJwd2NuIiwiaWF0IjoxNTExMzQ0NzkxfQ.izDygjOBn8TNNIK2V4QOZlV2WrdrWqNmSmhAO-BmPr8'}
});
export const requestLogin = params => { return instance.post(`http://localhost:8066/admin/login`, qs.stringify(params)).then(res => res.data); };

export const getRequest = params => { return instance.get('http://localhost:8066/admin/source/gambles', { params: params }); };