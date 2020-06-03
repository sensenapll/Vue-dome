// 引入Vue
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由
import routes from './routes'
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history', // 干掉地址栏上的#号
  routes
})
