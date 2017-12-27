import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Page1 from './views/nav6/Page1.vue'
import Page2 from './views/nav6/Page2.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/addguess/addguess.vue'
import Page7 from './views/exditguess/exditguess.vue'
import Page from './views/editguess/Page.vue'
import Page8 from './views/editguess/editguess.vue'
import Page12 from './views/editguess/editdetail.vue'
import Page10 from './views/setguess/setguess.vue'
import Page11 from './views/setguess/setguessdetail.vue'

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
            { path: '/page6', component: Page6, name: '创建预备竞猜' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa icons-icon-out-guess',
        leaf: true,//只有一个节点
        children: [
            { path: '/page7', component: Page7,meta: {requireAuth: true,}, name: '外部预备竞猜' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa icons-icon-edit-guess',
        leaf: true,//只有一个节点
        children: [
            { path: '/page8', component: Page, name: '编辑已上传竞猜',children:[
                {path:'',meta: {requireAuth: true,},component: Page8},
                {path:'/page8/:id',meta: {requireAuth: true,},component: Page12}
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
            { path: '/page1', iconCls: 'fa icons-icon-leagues',meta: {requireAuth: true,}, component: Page1, name: '待添加赛事' },
            { path: '/page2', iconCls: 'fa icons-icon-wait-teams',meta: {requireAuth: true,}, component: Page2, name: '待添加战队' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '添加赛事及战队',
        iconCls: 'fa icons-icon-add-games',
        children: [
            { path: '/page4', iconCls: 'fa icons-icon-loading',meta: {requireAuth: true,}, component: Page4, name: '添加赛事' },
            { path: '/page5', iconCls: 'fa icons-icon-teams',meta: {requireAuth: true,}, component: Page5, name: '添加战队' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa icons-icon-add-guess',
        leaf: true,//只有一个节点
        children: [
            { path: '/page10', component: Page, name: '创建冠军竞猜' ,children:[
                {path:'',component: Page10},
                {path:'/page10/add/',meta: {requireAuth: true,},component: Page11},
                {path:'/page10/add/:id',meta: {requireAuth: true,},component: Page11}
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