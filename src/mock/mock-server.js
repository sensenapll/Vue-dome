// 引入mock
import Mock from 'mockjs'
// 引入data.json---模版数据
import data from './data.json'

// 拦截ajax请求,返回生成的随机数据---模拟数据---根据模版数据产生的模拟(后台)数据
// Mock.mock('地址',模拟的数据)

// 第一个参数,是要拦截的地址,第二个参数,要返回的数据
Mock.mock('/goods', { code: 0, data: data.goods })
Mock.mock('/ratings', { code: 0, data: data.ratings })
Mock.mock('/info', { code: 0, data: data.info })