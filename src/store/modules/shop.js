// 引入mutation的type
import { RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO, ADD_FOOD_COUNT, REDUCE_FOOD_COUNT } from '../mutation-type'
// 引入接口
import { reqGoods, reqRatings, reqInfo } from '../../api'
// 引入Vue
import Vue from 'vue'
const state = {
  // 点餐信息
  goods: [],
  // 评价信息
  ratings: [],
  // 商家信息
  info: {},
   // 存储食物的容器
  cartFoods: []
}
const mutations = {
  // 更新点餐信息
  [RECEIVE_GOODS] (state, { goods }) {
    state.goods = goods
  },
  // 更新评价信息
  [RECEIVE_RATINGS] (state, { ratings }) {
    state.ratings = ratings
  },
  // 更新商家信息
  [RECEIVE_INFO] (state, { info }) {
    state.info = info
  },


  // 增加食物
  [ADD_FOOD_COUNT] (state, { food }) {
    // 判断食物的数量是否有值---food.count中count属性是我们自己添加的
    if (!food.count) {
      // 第一次增加食物数量
      // food是一个响应式的数据---响应式的对象,count是自己添加的一个属性,属于非响应式的属性
      // 响应式的对象中如果添加的属性是响应式的,那么界面就会有变化,
      // 但是,响应式的对象中添加了一个非响应式的属性,即使添加了这个属性,但是界面也不会重新渲染
      // 响应式数据: 该数据的值如果发生变化,此时界面会随之而改变
      // 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新
      Vue.set(food, 'count', 1)
      // food.count = 1
      state.cartFoods.push(food)
    } else {
      food.count++
    }

  },
  // 减少食物
  [REDUCE_FOOD_COUNT] (state, { food }) {
    // 判断食物的数量是否大于0
    if (food.count > 0) {
      food.count--
      // 判断食物的数量是否为0
      if(food.count === 0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  }
}
const actions = {
  // 获取点餐信息
  async getGoods ({ commit }) {
    // 调用接口
    const result = await reqGoods()
    // 判断是否获取成功
    if (result.code === 0) {
      const goods = result.data
      // 调用mutation更新数据
      commit(RECEIVE_GOODS, { goods })
    }
  },
  // 获取评价信息
  async getRatings ({ commit }) {
    // 调用接口
    const result = await reqRatings()
    // 判断
    if (result.code === 0) {
      const ratings = result.data
      // 调用mutation更新数据
      commit(RECEIVE_RATINGS, { ratings })
    }
  },
  // 获取商家信息
  async getInfo ({ commit }) {
    // 调用接口
    const result = await reqInfo()
    // 判断
    if (result.code === 0) {
      const info = result.data
      // 调用mutation提交
      commit(RECEIVE_INFO, { info })
    }
  },
  // 增加或者减少食物的数量的
  updateFoodCount ({ commit }, { isAdd, food }) {
    // 判断isAdd这个标识是true还是false,true----增加,false---减少
    if (isAdd) {
      // 增加操作
      commit(ADD_FOOD_COUNT, { food })
    } else {
      // 减少操作
      commit(REDUCE_FOOD_COUNT, { food })
    }
  }
  // xxx(){
  //   console.log('我是子的actions')
  // }

}

// 计算属性
const getters = {
  // 计算总数量
  totalCount (state) {
    return state.cartFoods.reduce((pre,food)=> pre + food.count,0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((pre,food)=> pre + food.count * food.price,0)
  }
  
}
export default {
  state,
  mutations,
  actions,
  getters
}