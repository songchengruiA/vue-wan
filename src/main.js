import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from './http'
import router from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });


//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  axios,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

