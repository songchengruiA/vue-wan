import axios from 'axios';
var qs = require('qs');
var tokenVal= JSON.parse(sessionStorage.getItem("token")) ? JSON.parse(sessionStorage.getItem("token")) : '';
import { Loading, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
    alert(2)
    // element ui Loading方法
    loadinginstace = Loading.service({ fullscreen: true })
    return config
}, error => {
    loadinginstace.close()
    Message.error({
        message: '加载超时'
    })
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
    alert(21)
    loadinginstace.close()
    return data
}, error => {
    loadinginstace.close()
    Message.error({
        message: '加载失败'
    })
    return Promise.reject(error)
})
//  创建预备竞猜
var instance = axios.create({
    headers: {'token': tokenVal}
});
var url = 'http://localhost:8066'
/*var url = 'http://47.93.223.69:8066'*/
//登录
export const requestLogin = params => { return instance.post(url+`/admin/login`, qs.stringify(params)).then(res => res.data); };
//  请求赛事
export const getRequest = params => { return instance.get(url+`/admin/source/gambles`, { params: params }); };
//修改电竞
export const  renew = params => { return instance.put(url+`/admin/source/gambles`, qs.stringify(params)).then(res => res.data); };
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
//添加战队列表
export const getTeams = params => { return instance.get(url+'/teams', {params: params}); };
//添加战队中的按品类搜索的列表
export const searchTeams = params => { return instance.get(url+'/admin/pwcn/teams', {params: params}); };
//赛事中的添加按钮
export const  addLeagues = params => { return instance.post(url+'/leagues', qs.stringify(params)).then(res => res.data); };
//赛事的详情
export const getLeaguesDetail = params => { return instance.get(url+'/leaguesdetail', {params: params}); };
//修改赛事之后提交
export const  modifyLeagues = params => { return instance.post(url+'/leaguesupdate', qs.stringify(params)).then(res => res.data); };
//删除赛事
export const  deleteLeagues = params => { return instance.post(url+'/leaguesdelete', qs.stringify(params)).then(res => res.data); };

//战队中的添加按钮
export const  addTeam = params => { return instance.post(url+'/teams', qs.stringify(params)).then(res => res.data); };
//战队的详情
export const getTeamsDetail = params => { return instance.get(url+'/teamsdetail', {params: params}); };
//战队中修改后的提交按钮
export const  modifyTeams = params => { return instance.post(url+'/teamsupdate', qs.stringify(params)).then(res => res.data); };
//删除战队
export const  deleteTeams = params => { return instance.post(url+'/teamsdelete', qs.stringify(params)).then(res => res.data); };


//赛事中的删除按钮
export const editeDetailGameGuess = (query,params) => { return instance.put(url+'/admin/gambles/'+query, qs.stringify(params)); };
//添加竞猜
export const addGame = params => { return instance.post(url+'/admin/gambles', qs.stringify(params)); };
// 获取趣味竞猜列表
export const getSetGuess = params => { return instance.get(url+'/admin/funbets', { params: params }); };
// 添加 结算趣味竞猜列表
export const postSetGuess = params => { return instance.post(url+'/admin/funbets',params); };
//编辑趣味竞猜详情
export const editeGameGuess = query => { return instance.get(url+'/admin/funbets/'+query); };