<template>
  <div class="on">
      <section class="msite">
        <!-- 首页头部
        <header class="header">
            <span class="header_search">
              <i class="iconfont icon-sousuo"></i>
            </span>
          <span class="header_title">
              <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
            </span>
          <span class="header_login">
              <span class="header_login_text">登录|注册</span>
            </span>
        </header> -->
        <Header :title="address.name || '正在定位中.....'">
          <span class="header_search" slot="left">
              <i class="iconfont icon-sousuo"></i>
            </span>
            <span class="header_login" slot="right">
              <span class="header_login_text">登录|注册</span>
            </span>
        </Header>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <!-- 当某个数据发生变化，相关联的数据会随之发生变化，使用计算属性 -->
              <div class="swiper-slide" v-for="(category,index) in categorysArr" :key="index">
                <a href="javascript:" 
                class="link_to_food" 
                v-for="(category,index) in categorys" 
                :key="index">
                  <div class="food_container">
                    <img :src="`https://fuss10.elemecdn.com`+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <!--首页附近商家-->
        <ShopList />
      </section>
    </div>
</template>
<script>
// 引入ShopList组件
import ShopList from '../../components/ShopList/ShopList'
// 引入swiper组件
import Swiper from 'swiper'
// 引入swiper的样式
import 'swiper/css/swiper.css'
// 引入vuex
import { mapState } from 'vuex'
export default {
  name: 'MSite',
  // 注册组件
  components: {
    ShopList
  },
  computed: {
    // 通过计算属性获取地址信息和食品分类信息
    // ...mapState(['address', 'categorys']),
      ...mapState({
        address: state => state.msite.address,
        categorys: state => state.msite.categorys
      }),
    // 食品分类的大数组---大数组中有两个小数组
    categorysArr () {
      // 定义一个大数组
      let bigArr = []
      // 定义一个小数组
      let smallArr = []
      // 获取食品分类信息数据
      const { categorys } = this
      // 遍历数据
      categorys.forEach(category => {
        // 如果小数组中没有数据，则添加到大数组中
        if (smallArr.length === 0) {
          bigArr.push(smallArr)
        }
        // 向小数组中添加数据
        smallArr.push(category)
        // 如果小数组的长度为8则清空小数组
        if (smallArr.length === 8) {
          smallArr = []
        }
      })
      // 返回大数组
      return bigArr
    }
  },
  // 界面渲染完毕
  async mounted() {
    // 调用action发送异步请求，获取商铺信息
    this.$store.dispatch('getShops')
    // 函数执行时，一旦遇到await就会返回，等到触发的异步操作完成(调用栈清空)，在接着执行函数后面的语句
    await this.$store.dispatch('getCategorys')
    // 函数执行时，一旦遇到await就会返回，等到触发的异步操作完成（并且调用栈清空），在接着执行函数体内后面的语句
    this.$nextTick(()=>{
      /* eslint-disable */
    var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    }
  })
    })
    
  },
  // 第一种解决方式
  // 监视
  // watch: {
  //   categorys() {
  //     // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
  //     this.$nextTick(()=> {
  //        /* eslint-disable */
  //       var mySwiper = new Swiper ('.swiper-container', {
  //       loop: true, // 循环模式选项
  //       // 如果需要分页器
  //       pagination: {
  //         el: '.swiper-pagination',
  //       }
  // })
  //     })
  //   }
  // }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
  .msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774   
</style>
