// 引入axios
import ajax from './ajax'
// 定义一个常量，设置地址
// const BASE = `http://loaclhost:5000`
const BASE = '/api'
// 根据经纬度获取位置详情
export const reqAddress = ({latitude,longitude}) => ajax.get(BASE + `/position/${latitude},${longitude}`)
// 获取食品分类列表
export const reqCategorys = () => ajax.get(BASE + `/index_category`)
// 根据经纬度获取获取商铺列表
export const reqShopList = ({longitude,latitude}) => ajax({
  method: 'GET',
  url: BASE+ '/shops',
  params: {
    longitude,
    latitude
  }
})