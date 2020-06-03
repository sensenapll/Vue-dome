// 引入axios
import axios from 'axios'
// 引入qs
import qs from 'qs'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  const { method, data } = config
  // 判断,method中是不是POST请求,并且data应该是一个对象----->urlEncoding形式
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  alert(error)
  // 中断错误消息
  return new Promise(() => { })
})
// 向外暴露axios
export default axios
