<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--current,哪个li被选中了,那么就应用current类样式-->
          <li
            class="menu-item"
            :class="{current:currentIndex===index}"
            v-for="(good,index) in goods"
            :key="index"
            @click="clickItem(index)"
          >
            <img class="icon" :src="good.icon" v-if="good.icon" />
            <span class="text bottom-border-1px">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food" />
  </div>
</template>
<script>
// 引入vuex
import { mapState } from 'vuex'
// 引入BScroll
import BScroll from 'better-scroll'
// 引入Food组件
import Food from './Food'
// 引入ShopCart组件
import ShopCart from './ShopCart'
export default {
  name: 'Goods',
  data() {
    return {
      scrollY: 0, // 默认向上滑动的距离的数据
      tops: [], // 右侧列表高度范围的数组
      food: {} // 这个是food对象,用来向Food组件传递数据的-----组件之间通信
    }
  },
  components: {
    Food,
    ShopCart
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),
    // 滑动的算法----算的是当前左侧哪个li要被选中的索引
    currentIndex() {
      const { tops, scrollY } = this
      const index = tops.findIndex(
        (top, index) => scrollY >= top && scrollY < tops[index + 1]
      )
      // 判断当前计算出来的索引值和左侧列表此时的索引是否一致,如果不一致,就应该设置左侧列表滑动(每次计算的时候把当前的索引保存起来,进行对比)
      if (this.index !== index && this.leftScroll) {
        // 上次左侧列表选中的索引值和当前的索引值不一致,那么就保存起来
        this.index = index

        // 设置左侧列表向上滑动,首先把左侧列表的li获取到
        const li = this.$refs.leftUl.children[index]
        // 设置左侧列表中对应的li移动到指定的索引的位置
        this.leftScroll.scrollToElement(li, 300)
      }
      return index
    }
  },
  async mounted() {
    // 获取点餐信息数据
    await this.$store.dispatch('getGoods')
    // 初始化滑动对象
    this._initBscroll()
    // 初始化tops数组数据
    this._initTops()
  },
  methods: {
    // 初始化滑动对象
    _initBscroll() {
      // 创建左侧滑动对象
      this.leftScroll = new BScroll('.menu-wrapper', {
        click: true
      })
      // 创建右侧滑动对象
      this.rightScroll = new BScroll('.foods-wrapper', {
        click: true,
        probeType: 1
      })
      // probeType-->1 滑动后过一会才会得到滑动的数据值 非实时的
      // probeType--->2  滑动的时候就可以获取滑动的数据值 实时的
      // probeType--->3  滑动的时候就可以获取滑动的数据值,而且还有惯性 实时的,惯性
      this.rightScroll.on('scroll', ({ x, y }) => {
        // console.log(y)
        this.scrollY = Math.abs(y)
      })
      this.rightScroll.on('scrollEnd', ({ x, y }) => {
        // console.log(y)
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化滑动距离的范围的数组---填充数据
    _initTops() {
      // 用来存储右侧所有外层的li的高度范围的
      const tops = []
      let top = 0
      // 默认数组中的数据
      tops.push(top)
      const list = this.$refs.rightUl.children
      Array.prototype.slice.call(list).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      console.log(tops)
      // 初始化tops数据
      this.tops = tops
    },
    // 点击左侧li,设置右侧列表滑动到指定的位置
    clickItem(index) {
      const scrollY = this.tops[index]
      this.scrollY = scrollY
      // 右侧列表滑动
      this.rightScroll.scrollTo(0, -scrollY, 300)
    },
    // 显示当前的Food组件回调函数
    showFood(food) {
      // 设置当前food对象的数据
      this.food = food
      this.$refs.food.foodShow()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 225px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>


