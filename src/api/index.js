// 引入ajax
import ajax from './ajax.js'
// 定义一个常量,设置地址
// const BASE = `http://localhost:5000`
const BASE = '/api'
// 根据经纬度获取位置详情
export const reqAddress = ({ longitude, latitude }) => ajax.get(BASE + `/position/${latitude},${longitude}`)
// 获取食品分类列表
export const reqCategorys = () => ajax({
  method: 'GET',
  url: BASE + `/index_category`,
  // header: {
  //   needToken: true //目的：在请求拦截器中获取该数据，如果为true,则该接口需要携带token
  // }
})
// 根据经纬度获取商铺列表
export const reqShopList = ({ longitude, latitude }) => ajax({
  method: 'GET',
  url: BASE + `/shops`,
  params: {
    longitude,
    latitude
  }
})
// 根据手机号码，发送短信验证码
export const reqSendCode = (phone) => ajax({
  method: 'GET',
  url: BASE + `/sendcode`,
  params: {
    phone
  }
})
// 手机和短信验证码登录方式
export const reqSmsLogin = (phone,code) => ajax({
  method: 'POST',
  url: BASE + `/login_sms`,
  data: {
    phone,
    code
  }
})
// 用户名和密码和图形验证码的登录方式接口
export const reqPwdLogin = ({name,pwd,captcha}) =>ajax({
  method: 'POST',
  url: BASE+ `/login_pwd`,
  data: {
    name,
    pwd,
    captcha
  }
})


// 自动登录得接口

export const reqAutoLogin= () => ajax({
  method:'GET',
  url: BASE + `/auto_login`,
  header: {
    needToken: true //需要携带token的
  }
})

// 点餐信息接口
export const reqGoods = () => ajax.get('/goods')
// 评价信息接口
export const reqRatings = () => ajax.get('/ratings')
// 商铺信息接口
export const reqInfo = () => ajax.get('/info')