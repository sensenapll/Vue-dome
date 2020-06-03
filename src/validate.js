// 引入Vue
import Vue from 'vue';
// 引入插件
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 声明使用插件
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  // 中文提示信息
  messages: zh_CN.messages,
  // 属性的汉化
  attributes: {
    phone: '手机号码',
    code: '短信验证码',
    name: '用户名',
    pwd: '密码',
    captcha: '图形验证码'
  }
});
// 扩展方法
VeeValidate.Validator.extend('changePhone', {
  getMessage: field => `请输入正确的` + field,
  validate: value => {
    return /^[1]\d{10}$/.test(value);
  }
});

// var dict = {
//   zh_CN: {
//     messages: {
//       required: function (field) {
//         return '请输入' + field;
//       },
//       confirmed: function (field) {
//         return '两次输入的密码不一致';
//       }
//     },
//     attributes: {
//       OldPassword: '旧密码',
//       NewPassword: '新密码',
//       ConfirmNewPassword: '确认密码',
//     }
//   }
// };

