import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { register } from '@/api';
import XHeader from '@/components/xheader/XHeader.vue';
// import Joi from "joi";
// import registerSchema from "./register.schema";
const meetModule = namespace('meeting');

@Component({
  components: {
    XHeader,
  },
})
export default class Register extends Vue {
  private title: string = '注册';
  private headerOption = {
    lefttext: '返回',
    lefticon: '',
    righttext: '',
    righticon: '',
  };
  private usercard: string = '';
  private username: string = '';
  private password: string = '';
  private confirmPassword: string = '';
  private iconEye: string = 'icon-close-eyes';
  private showPassword: boolean = true;
  eyeOpen() {
    if (this.showPassword) {
      this.showPassword = !this.showPassword;
      this.iconEye = 'icon-eyes';
    } else {
      this.showPassword = !this.showPassword;
      this.iconEye = 'icon-close-eyes';
    }
  }
  returnLogin() {
    wx.redirectTo({ url: '../../logon/login/main' });
  }
  async handleRegister() {
    let responseValue;
    try {
      //简单过滤一下
      if (this.password !== this.confirmPassword) {
        wx.showToast({
          title: '两次密码不一致，请从新校验~~~',
          duration: 3000,
        });
        return;
      }
      if (!new RegExp(/^A\d{4}$/).test(this.usercard)) {
        wx.showToast({
          title: '注册账号有误，请以格式/^Ad{4}$/注册',
          duration: 3000,
        });
        return;
      }
      const params = `usercard=${this.usercard}&username=${
        this.username
      }&password=${this.password}`;
      responseValue = await register(params);
    } catch (err) {
      alert(err);
      return;
    }
    let { status, data } = responseValue;
    if (status !== 200) {
      alert('服务器异常');
    } else {
      if (data.status === 'fail') {
        alert(data.msg);
      } else {
        wx.redirectTo({ url: '../login/main' });
      }
    }
  }
}
