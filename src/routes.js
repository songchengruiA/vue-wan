import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import Page7 from './views/nav4/Page7.vue'
import Page8 from './views/nav5/Page8.vue'
import Page12 from './views/nav5/Page12.vue'
import echarts from './views/charts/echarts.vue'

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
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '创建预备竞猜' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page7', component: Page7, name: '外部预备竞猜' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page8', component: Page8, name: '编辑已上传竞猜', children:[{
                path: '/page8/Page12', component: Page12,props: false
            }] }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '待添加赛事及战队',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '待添加赛事' },
            { path: '/page5', component: Page5, name: '待添加战队' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '添加赛事以及战队',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '添加赛事' },
            { path: '/page5', component: Page5, name: '添加战队' }
        ]
    },
    {
        path: '/',
        meta: {
            requireAuth: true,
        },
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page8', component: Page8, name: '创建趣味竞猜'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
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
router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {

    }
    else {
        axios.interceptors.request.use(
            config => {
                if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                    config.headers.Authorization = `token ${token}`;
                }
                return config;
            },
            err => {
            });
        axios.interceptors.response.use(
            response => {
                return response;
            },
            error => {

            });
        next();
    }
})
export default router;