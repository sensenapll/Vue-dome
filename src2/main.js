import Vue from 'vue'
import App from './App.vue'
// 引入router
import router from './router'
// 引入store
import store from './store'
// 引用公共组件Header
import Header from './components/Header/Header.vue'
// 引入公共组件
import Star from './components/Star/Star'
//  注册成公共组件
Vue.component(Header.name, Header)
Vue.component(Star.name, Star)
Vue.config.productionTip = false
// 创建vue的实例对象
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 注册路由器
  router,
  // 注册仓库
  store
})
