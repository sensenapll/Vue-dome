<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" :class="cls" v-for="(cls, index)in classArr" :key="index"></span>
  </div>
</template>
<script>
export default {
  name: 'Star',
  props: {
    // 图片尺寸类型
    size:String,
    // 传过来的分数，数字类型
    score: Number
  },
  // on ---满星，half---半星，off---灰星
  // 根据分数来计算有几个on,有几个half，有几个off---最终肯定一共有五个，需要一个容器把on,half,off存储起来
  // 分数的变化，会影响这个数组的变化，['on','on','on','half','off']
  computed: {
    classArr(){
      // 定义数组用来存储不同的类样式的名字
      const clsArr = []
      // 先获取分数
      const {score} = this
      // 4.7 ---4个满星   0.7>=0.5 ---半个星星（1个）
      // 3.6 --- 3个满星  0.6>=0.5 ---半颗星星（1个）--1个灰星
      // 3.1 ---3个满星  0.1<=0.5 ---0个半个星星---2个灰星
      // 取整的分数
      let scoreInt = Math.floor(score)
      // 根据整数的这个分数，计算on的个数
      for (let i = 0; i < scoreInt; i++) {
        clsArr.push('on')
        // 计算半颗星星
        // 无论是多少分，只能是有一个半颗星星，或者没有
        if (score * 10 -scoreInt *10 >= 5) {
          clsArr.push('half')
        }
        // 计算灰色星星 --一共有5课星星
        while (clsArr.length < 5) {
          clsArr.push('off')
        }
        return clsArr
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl'
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>