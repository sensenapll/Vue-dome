<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone"
                v-validate="'required|changePhone'"
              />
              <span style="color:red">{{ errors.first('phone') }}</span>
              <button
                :disabled="!isRightPhone||computedTime>0"
                :class="{right:isRightPhone}"
                @click.prevent="sendCode"
                class="get_verification"
              >{{computedTime>0?`已发送(${computedTime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="'required'"
              />
              <span style="color:red">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                  name="name"
                  v-validate="'required'"
                />
                <span style="color:red">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input
                  :type="isShowPwd?'text':'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required'"
                />
                <span style="color:red">{{ errors.first('pwd') }}</span>
                <div
                  class="switch_button"
                  :class="isShowPwd?'on':'off'"
                  @click="isShowPwd=!isShowPwd"
                >
                  <div class="switch_circle" :class="{run_circle:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="'required'"
                />
                <span style="color:red">{{ errors.first('captcha') }}</span>
                <img
                  @click="sendCaptcha"
                  ref="captcha"
                  class="get_verification"
                  src="http://localhost:5000/captcha"
                  alt="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
// 引入接口
import { reqSendCode, reqSmsLogin, reqPwdLogin } from '../../api'
// 引入Mint UI
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'Login',
  data() {
    return {
      loginWay: true, // true--默认值,是短信登录,false---密码登录
      phone: '', // 用来存储手机号码的
      computedTime: 0, // 用来发送短信码倒计时的
      isShowPwd: false, // 默认是false,表示是密文密码,如果为true,就可以看到明文密码
      code: '', // 短信验证码
      name: '', // 用户名
      pwd: '', //密码
      captcha: '' // 图形验证码
    }
  },
  computed: {
    // 手机号码正确的情况为true,否则为false
    isRightPhone() {
      return /[1]\d{10}/.test(this.phone)
    }
  },
  methods: {
    // 发送短信验证码
    async sendCode() {
      // 进行倒计时
      this.computedTime = 10
      // 启动定时器,并存储定时器id
      this.timeId = setInterval(() => {
        this.computedTime--
        if (this.computedTime <= 0) {
          // 还原为默认值
          this.computedTime = 0
          // 清理定时器
          clearInterval(this.timeId)
        }
      }, 1000)

      // 真正的发送验证码了---调用发送短信码的接口----
      const result = await reqSendCode(this.phone)
      // 判断是否发送成功
      if (result.code === 0) {
        // 发送成功
        Toast('发送成功')
      } else {
        // 发送失败了
        // MessageBox('提示', '发送失败');
        MessageBox.alert('发送失败了', '提示')
      }
    },
    // 发送请求,切换图形验证码
    sendCaptcha() {
      this.$refs.captcha.src =
        'http://localhost:5000/captcha?time=' + Date.now()
    },
    // 登录操作
    async login() {
      // 获取登录方式及表单验证的各个数据
      const { loginWay, phone, code, name, pwd, captcha } = this
      let names
      // 判断是哪一种登录方式
      if (loginWay) {
        names = ['phone', 'code']
      } else {
        names = ['name', 'pwd', 'captcha']
      }
      const success = await this.$validator.validateAll(names) //表单整体校验  将来用
      // 判断表单验证是否通过
      if (success) {
        // 调用不同的登录的接口
        let result
        // 再次判断登录方式
        if (loginWay) {
          // 手机和短信登录
          result = await reqSmsLogin(phone, code)
          // 清空短信验证码的文本框
          this.code = ''
        } else {
          // 用户名/密码/图形验证码
          result = await reqPwdLogin({ name, pwd, captcha })
          // 重新刷新一下图形码
          this.sendCaptcha()
          // 图形码的文本框清空
          this.captcha = ''
        }
        console.log(result)
        // 判断调用接口后登录是否成功----
        if (result.code === 0) {
          // 保存用户信息
          const user = result.data
          // 把用户数据更新到Vuex中
          this.$store.dispatch('saveUser',user)
          // 跳转界面
          this.$router.replace('/profile')
        } else {
          // 登录失败了
          Toast('登录失败了')
        }
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.run_circle
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
