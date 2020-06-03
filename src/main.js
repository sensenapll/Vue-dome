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
// 引入公共组件
import CartControl from './components/CartControl/CartControl.vue'
// 引入表单验证的插件validate
import './validate'
// 引入mock的js文件
import './mock/mock-server'
// 引入vue-lazyload
import VueLazyload from 'vue-lazyload'
// 引入图片的lujing
import loading from './common/images/loading.jpg'
import { Button }from 'mint-ui'
// 声明使用插件包
Vue.use(VueLazyload,{
  loading
})
//  注册成公共组件
Vue.component(Button.name,Button)
Vue.component(Header.name, Header)
Vue.component(Star.name, Star)
Vue.component(CartControl.name,CartControl)
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
