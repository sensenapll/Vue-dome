import { RECEIVE_USER,RECEIVE_TOKEN,RESET_USER, RESET_TOKEN} from '../mutation-type'
import { reqAutoLogin} from '../../api'

const state = {
  // 用户信息
  user: {},
  // token信息
  token:localStorage.getItem('token_key'), //修改一下，此事如果没有登录过，null

}

const mutations = {
  // 保存用户信息
  [RECEIVE_USER](state,user){
    state.user = user
  },
  // 保存token信息
  [RECEIVE_TOKEN](state,token){
    state.token = token
  },
  // 重置用户信息
  [RESET_USER](state){
    state.user = {}
  },
  // 重置token信息
  [RESET_TOKEN](state){
    state.token = ''
  },
}

const actions ={
  // 保存用户信息----和token信息
  saveUser ({commit},user) {
    // 获取token
    const token = user.token
    // 保存token到vuex中
    commit(RECEIVE_TOKEN,token)
    // 保存token到localStorage中
    localStorage.setItem('token_key',token)
    // 删除user中的token ----不一定是必须的
    delete user.token
    // 保存user到vuex中
    commit(RECEIVE_USER,user)
  },

  // 退出操作，重置user信息和token信息

  resetLogin ({commit}) {
    // 重置用户信息
    commit(RESET_USER)
    // 重置token信息
    commit(RESET_TOKEN)
    // 清空localStorage中的token
    localStorage.removeItem('token_key')
  },


  // 自动登录
 async  autoLogin ({ state, commit }) {
  // 取出token
  if (state.token) {
    // 调用自动登录得接口
    const result = await reqAutoLogin()
    if (result.code === 0) {
      // 有数据 --user对象
      const user = result.data
      // 更新user对象数据
      commit(RECEIVE_USER,user)
    }
  } 
  },
}
const getters = {}
export default{
  state,
  mutations,
  actions,
  getters
}