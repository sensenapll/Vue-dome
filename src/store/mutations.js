// // 包含了多个直接修改状态数据的方法的对象
// // 引入mutations的type
// import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER, RECEIVE_TOKEN, RESET_USER,RESET_TOKEN,RECEIVE_GOODS,RECEIVE_RATINGS,RECEIVE_INFO} from './mutation-type'
// export default {
//   // 更新地址信息
//   [RECEIVE_ADDRESS] (state, address) {
//     state.address = address
//   },
//   // 更新食品分类信息
//   [RECEIVE_CATEGORYS] (state, categorys) {
//     state.categorys = categorys
//   },
//   // 更新商品列表信息
//   [RECEIVE_SHOPS] ( state,shops) {
//     state.shops = shops
//   },



//   // 保存用户信息
//   [RECEIVE_USER](state,user){
//     state.user = user
//   },
//   // 保存token信息
//   [RECEIVE_TOKEN](state,token){
//     state.token = token
//   },
//   // 重置用户信息
//   [RESET_USER](state){
//     state.user = {}
//   },
//   // 重置token信息
//   [RESET_TOKEN](state){
//     state.token = ''
//   },

//   // 更新点餐信息
//   [RECEIVE_GOODS](state,{goods}){
//     state.goods = goods
//   },
//   // 更新评价信息
//   [RECEIVE_RATINGS](state, {ratings}){
//     state.ratings = ratings
//   },
//   // 更新商家信息
//   [RECEIVE_INFO](state,{info}){
//     state.info = info
//   }
// }
