import axios from 'axios';
var qs = require('qs');

let base = '';

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//  创建预备竞猜
var instance = axios.create({
    headers: {'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJwd2NuIiwiaWF0IjoxNTEyNjI2ODc2fQ.kPYiLY0z65M6_B_wxStnKebrAO7WtTR3hywj-i8m9zk'}
});
/*var url = 'http://localhost:8066/'*/
var url = 'http://47.93.223.69:8066'
//登录
export const requestLogin = params => { return instance.post(url+`admin/login`, qs.stringify(params)).then(res => res.data); };
//  请求赛事
export const getRequest = params => { return instance.get(`http://47.93.223.69:8066/admin/source/gambles`, { params: params }); };
//修改电竞
export const  renew = params => { return instance.put(url+`admin/source/gambles`, qs.stringify(params)).then(res => res.data); };
//上传电竞
export const  upload = params => { return instance.post(url+`/admin/pwcn/gambles`, qs.stringify(params)).then(res => res.data); };
//删除电竞
export const  delGaming = query => { return instance.delete(url+'/admin/source/gambles/' + query).then(res => res.data); };
//获取赛事信息
export const getGameName= params => { return instance.get(url+'/admin/pwcn/leagues', { params: params }); };
//获取战队信息
export const getTeamName= params => { return instance.get(url+'/admin/pwcn/teams', { params: params }); };
//创建预备竞猜
export const  creatGame = params => { return instance.post(url+'/admin/source/gambles', qs.stringify(params) ).then(res => res.data); };
//编辑已上传竞猜
export const getGameGuess = params => { return instance.get(url+'/admin/matches', { params: params }); };
//赛制
export const postGameGuess = (query,params) => { return instance.post(url+'/admin/matches/'+query, qs.stringify(params)); };
//待添加赛事列表
export const getWaitLeagues = params => { return instance.get(url+'/admin/source/leagues', { params: params }); };
//改变赛事等级
export const chanLevel = (query, params) => { return instance.put(url+'/admin/source/leagues/'+ query, qs.stringify(params)).then(res => res.data); };
//保存赛事
export const  saveLeagues = params => { return instance.post(url+'/admin/source/leagues', qs.stringify(params)).then(res => res.data); };
//待添加战队列表
export const getWaitTeams = params => { return instance.get(url+'/admin/source/teams', {params: params}); };
//队伍已添加
export const addTeams = params =>{ return instance.post(url+'/admin/source/teams', qs.stringify(params) ).then(res => res.data); };
//添加赛事列表
export const getLeagues = params => { return instance.get(url+'/admin/pwcn/leagues', {params: params}); };
//添加赛事中的按品类搜索的列表
export const searchLeagues = params => { return instance.get(url+'/getleague', {params: params}); };
//获取编辑详情
export const getDetailGameGuess = params => { return instance.get(url+'/admin/gambles', { params: params }); };
//编辑取消保存详情
export const editeDetailGameGuess = (query,params) => { return instance.put(url+'/admin/gambles/'+query, qs.stringify(params)); };
//添加竞猜
export const addGame = params => { return instance.post(url+'/admin/gambles', qs.stringify(params)); };
// 获取趣味竞猜列表
export const getSetGuess = params => { return instance.get(url+'/admin/funbets', { params: params }); };
// 添加 结算趣味竞猜列表
export const postSetGuess = params => { return instance.post(url+'/admin/funbets',params); };
//编辑趣味竞猜详情
export const editeGameGuess = query => { return instance.get(url+'/admin/funbets/'+query); };