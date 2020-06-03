// 引入axios
import axios from 'axios'
// 引入qs
import qs from 'qs'
// 引入store
import store from '../store'
// 引入Toast，在mint-ui中
import { Toast } from 'mint-ui'
// 引入路由器对象 --- 涉及到跳转的问题
import router from '../router'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  const { method, data } = config
  // 判断,method中是不是POST请求,并且data应该是一个对象----->urlEncoding形式
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  // t通过config对象获取headers中needToken属性的值，判断是否需要携带token
  if (config.headers.needToken) {
    // 取出token -----此处token将来会在user模块中，需要重新改代码
    const token = store.state.user.token
    // 判断token是否存在
    if (!token) {
      console.log(token);
      // 没有token
      const error = new Error('没有token,请重新登录')
      error.status = 401 //错误码
      throw error // 抛出错误消息
    }else {
     // 有token 
     config.headers.authorization = token
    }
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  // alert(error)
  // 处理请求的时候的错误消息及响应的时候的错误消息
  if (!error.response) {
    // 请求的时候的错误消息
    if (error.status == 401) {
      // 判断如果此时不是login界面，进行跳转，提示登录
      if (router.currentRoute.path !== '/login') {
        // 提示错误的信息，并跳转
        Toast(error.message)
        // 跳转
        router.replace('/login')
      }
    }
  }else {
    // 响应的时候的错误消息
    // 获取响应的时候的错误码
    const status = error.response.status
    if (status===401) {
      // token过期。跳转到login
      if (router.currentRoute.path !== '/login') {
        // 提示错误信息
        Toast(error.response.data.message)
        // 重置token
        store.dispatch('resetLogin')
        // 跳转界面
        router.replace('/login')
      }
    }else if(status === 404) {
      Toast('没有资源')
    }else {
      Toast('请求错去:' +error.message)
    }
  }
  // 中断错误消息
  return new Promise(() => { })
})
// 向外暴露axios
export default axios
