<template>
  <div>
    <!-- 对应的组件视图 -->
    <router-view/>
    <!-- 组件 -->
    <FooterGuide v-show="$route.meta.isShowFooter==true"/>
  </div>
</template>
<script>
// 引入FooterGuide组件
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted () {
    // 调用对应的action，获取地址信息---在vuex中存储
    this.$store.dispatch('getAddress')
    // 界面加载完毕后，调用自动登录的方法---在actions中
    this.$store.dispatch('autoLogin')
    // this.$store.dispatch('getCategorys')
    // this.$store.dispatch('getShops')
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
