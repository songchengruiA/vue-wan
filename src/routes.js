import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import waitLeague from './views/waitaddleagues/waitleague.vue'
import waitTeam from './views/waitaddleagues/waitteam.vue'
import addLeague from './views/addleagues/addleague.vue'
import addTeam from './views/addleagues/addteam.vue'
import addGuess from './views/addguess/addguess.vue'
import exditGuess from './views/exterguess/exterguess.vue'
import Page from './views/editguess/Page.vue'
import editGuess from './views/editguess/editguess.vue'
import editDetail from './views/editguess/editdetail.vue'
import setGuess from './views/setguess/setguess.vue'
import setGuessDetail from './views/setguess/setguessdetail.vue'

Vue.use(VueRouter)
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa icons-icon-buld-guess',
        leaf: true,//只有一个节点
        children: [
            { path: '/addguess', component: addGuess, name: '创建预备竞猜' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa icons-icon-out-guess',
        leaf: true,//只有一个节点
        children: [
            { path: '/exterguess', component: exditGuess,meta: {requireAuth: true,}, name: '外部预备竞猜' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa icons-icon-edit-guess',
        leaf: true,//只有一个节点
        children: [
            { path: '/editguess', component: Page, name: '编辑已上传竞猜',children:[
                {path:'',meta: {requireAuth: true,},component: editGuess},
                {path:'/editguess/:id',meta: {requireAuth: true,},component: editDetail}
            ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '待添加赛事及战队',
        iconCls: 'fa icons-icon-wait-leagues',
        children: [
            { path: '/waitleague', iconCls: 'fa icons-icon-leagues',meta: {requireAuth: true,}, component: waitLeague, name: '待添加赛事' },
            { path: '/waitteam', iconCls: 'fa icons-icon-wait-teams',meta: {requireAuth: true,}, component: waitTeam, name: '待添加战队' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '添加赛事及战队',
        iconCls: 'fa icons-icon-add-games',
        children: [
            { path: '/addleague', iconCls: 'fa icons-icon-loading',meta: {requireAuth: true,}, component: addLeague, name: '添加赛事' },
            { path: '/addteam', iconCls: 'fa icons-icon-teams',meta: {requireAuth: true,}, component: addTeam, name: '添加战队' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa icons-icon-add-guess',
        leaf: true,//只有一个节点
        children: [
            { path: '/setguess', component: Page, name: '创建冠军竞猜' ,children:[
                {path:'',component: setGuess},
                {path:'/setguess/add/',meta: {requireAuth: true,},component: setGuessDetail},
                {path:'/setguess/add/:id',meta: {requireAuth: true,},component: setGuessDetail}
            ]}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

const router = new VueRouter({
    routes
});
var token = JSON.parse(sessionStorage.getItem('token'));
// 全局导航钩子
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})


export default router;