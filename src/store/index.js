// 引入Vue
import Vue from 'vue'
// 引入Vux
import Vuex from 'vuex'
// 引入state
import state from './state'
// 引入mutations
import mutations from './mutations'
// 引入actions
import actions from './actions'
// 引入getters
import getters from './getters'
// 引入模块
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'
// 声明使用Vuex
Vue.use(Vuex)
// 实例化Vuex的对象，并暴露出去
export default new Vuex.Store({
  state,   //总的state
  mutations,  //总的mutations
  actions, //总的actions
  getters,   //总的getters
  modules: {
    msite,
    shop,
    user
  }
})

