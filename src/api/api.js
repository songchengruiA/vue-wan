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
    headers: {'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJwd2NuIiwiaWF0IjoxNTEyNzA1NDc4fQ.GNuIxMb_VxhvIeEynghoXsZNBj8Lcv5Q6WhzF7hiPvI'}
});
//登录
export const requestLogin = params => { return instance.post(`http://47.93.223.69:8066/admin/login`, qs.stringify(params)).then(res => res.data); };
//  请求赛事
export const getRequest = params => { return instance.get('http://47.93.223.69:8066/admin/source/gambles', { params: params }); };
//修改电竞
export const  renew = params => { return instance.put(`http://47.93.223.69:8066/admin/source/gambles`, qs.stringify(params)).then(res => res.data); };
//上传电竞
export const  upload = params => { return instance.post(`http://47.93.223.69:8066/admin/pwcn/gambles`, qs.stringify(params)).then(res => res.data); };
//删除电竞
export const  delGaming = query => { return instance.delete('http://47.93.223.69:8066/admin/source/gambles/' + query).then(res => res.data); };
//获取赛事信息
export const getGameName= params => { return instance.get('http://47.93.223.69:8066/admin/pwcn/leagues', { params: params }); };
//获取战队信息
export const getTeamName= params => { return instance.get('http://47.93.223.69:8066/admin/pwcn/teams', { params: params }); };
//创建预备竞猜
export const  creatGame = params => { return instance.post('http://47.93.223.69:8066/admin/source/gambles', qs.stringify(params) ).then(res => res.data); };
//编辑已上传竞猜
export const getGameGuess = params => { return instance.get('http://47.93.223.69:8066/admin/matches', { params: params }); };

//待添加赛事及战队
//待添加赛事列表
export const getWaitLeagues = params => { return instance.get('http://47.93.223.69:8066/admin/source/leagues', { params: params }); };
//改变赛事等级
export const chanLevel = (query, params) => { return instance.put('http://47.93.223.69:8066/admin/source/leagues/'+ query, qs.stringify(params)).then(res => res.data); };
//保存赛事
export const  saveLeagues = params => { return instance.post('http://47.93.223.69:8066/admin/source/leagues', qs.stringify(params)).then(res => res.data); };
//待添加战队列表
export const getWaitTeams = params => { return instance.get('http://47.93.223.69:8066/admin/source/teams', {params: params}); };
//队伍已添加
export const addTeams = params =>{ return instance.post('http://47.93.223.69:8066/admin/source/teams', qs.stringify(params) ).then(res => res.data); };

//添加赛事及战队
//添加赛事列表
export const getLeagues = params => { return instance.get('http://47.93.223.69:8066/admin/pwcn/leagues', {params: params}); };
//添加赛事中的按品类搜索的列表
export const searchLeagues = params => { return instance.get('http://47.93.223.69:8066/getleague', {params: params}); };
//获取编辑详情
export const getDetailGameGuess = params => { return instance.get('http://47.93.223.69:8066/admin/gambles', { params: params }); };
//编辑取消保存详情
export const editeDetailGameGuess = (query,params) => { return instance.put('http://47.93.223.69:8066/admin/gambles/'+query, qs.stringify(params)); };
//添加战队列表
export const getTeams = params => { return instance.get('http://47.93.223.69:8066/teams', {params: params}); };
//添加战队中的按品类搜索的列表
export const searchTeams = params => { return instance.get('http://47.93.223.69:8066/admin/pwcn/teams', {params: params}); };
//赛事中的添加按钮
export const  addLeagues = params => { return instance.post('http://47.93.223.69:8066/leagues', qs.stringify(params)).then(res => res.data); };
//赛事的详情
export const getLeaguesDetail = params => { return instance.get('http://47.93.223.69:8066/leaguesdetail', {params: params}); };
//修改赛事之后提交
export const  modifyLeagues = params => { return instance.post('http://47.93.223.69:8066/leaguesupdate', qs.stringify(params)).then(res => res.data); };
//删除赛事
export const  deleteLeagues = params => { return instance.post('http://47.93.223.69:8066/leaguesdelete', qs.stringify(params)).then(res => res.data); };

//战队中的添加按钮
export const  addTeam = params => { return instance.post('http://47.93.223.69:8066/teams', qs.stringify(params)).then(res => res.data); };
//战队的详情
export const getTeamsDetail = params => { return instance.get('http://47.93.223.69:8066/teamsdetail', {params: params}); };
//战队中修改后的提交按钮
export const  modifyTeam = params => { return instance.post('http://47.93.223.69:8066/teamsupdate', qs.stringify(params)).then(res => res.data); };
//删除战队
export const  deleteTeams = params => { return instance.post('http://47.93.223.69:8066/teamsdelete', qs.stringify(params)).then(res => res.data); };

