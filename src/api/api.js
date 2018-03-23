import axios from 'axios';
var qs = require('qs');
var tokenVal= JSON.parse(sessionStorage.getItem("token")) ? JSON.parse(sessionStorage.getItem("token")) : '';
//  创建预备竞猜
var instance = axios.create({
    headers: {'token': tokenVal}
});
// var url = 'http://localhost:8066'
var url = 'http://47.93.223.69:8066'
// 登录
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
//上传外部竞猜
export const  creatGameA = params => { return instance.post(url+'/admin/pwcn/gambles', qs.stringify(params) ).then(res => res.data); };
//赛程
export const getSchedule = params => { return instance.get(url+'/admin/source/matches', { params: params }); };
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
export const editeGameGuess = query => { return instance.get(url+'/admin/funbets/'+ query); };

//话题
//话题Banner列表
export const getTopicBanner = params => { return instance.get(url+'/admin/banners', { params: params }); };
//添加话题Banner
export const addTopicBanner = params => { return instance.post(url+'/admin/banners',params); };
//获取话题Banner详情
export const getTopicBannerDetail = query => { return instance.get(url+'/admin/banners/' + query); };
//修改话题Banner
export const modifyTopicBanner = (query, params) => { return instance.put(url+'/admin/banners/'+ query, qs.stringify(params)).then(res => res.data); };
//向上向下排序
export const setTopicBanner = params => { return instance.post(url+'/admin/banners/setbannersort',params); };
//删除
export const deleteTopicBanner = (query) => { return instance.delete(url+'/admin/banners/'+ query); };

//话题集合列表
export const getTopicGather = params => { return instance.get(url+'/admin/tags', { params: params }); };
//获取未添加话题列表
export const getNoTopicGather = params => { return instance.get(url+'/admin/tags/topics/noaddtopics', { params: params }); };
//添加话题集合
export const addTopicGather = params => { return instance.post(url+'/admin/tags',params); };
//获取话题集合详情
export const getTopicGatherDetail = query => { return instance.get(url+'/admin/tags/' + query); };
//修改话题集合
export const modifyTopicGather = (query, params) => { return instance.put(url+'/admin/tags/'+ query, qs.stringify(params)).then(res => res.data); };
//删除话题集合下的某个话题（支持批量）
export const deleteTopicGatherItem = (query1, query2) => { return instance.delete(url+'/admin/tags/'+ query1 + '/' +query2); };
//删除
export const deleteTopicGather = (query) => { return instance.delete(url+'/admin/tags/'+ query); };

//全部话题
export const getAllTopic = params => { return instance.get(url+'/admin/topics', { params: params }); };
//获取抓去平台中未添加的列表
export const getNoAddAllTopic = params => { return instance.get(url+'/admin/topics/pick/pickkeyword', { params: params }); };
//删除
export const deleteAllTopic = (query) => { return instance.delete(url+'/admin/topics/'+ query + '/2'); };

//热门话题
export const getHotTopic = params => { return instance.get(url+'/admin/topics', { params: params }); };
//获取未添加热门话题列表
export const getNoHotTopic = params => { return instance.get(url+'/admin/topics/getNoAddHotTopicList', { params: params }); };
//获取热门话题已经添加的列表
export const getHotTopicDetail = params => { return instance.get(url+'/admin/topics', { params: params }); };
//点击提交按钮
export const addHotTopic = params => { return instance.post(url+'/admin/topics/setHotTopic',params); };
//删除
export const deleteHotTopic = (query) => { return instance.delete(url+'/admin/topics/'+ query + '/1'); };


