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
  private loginPasswordType: string = 'password';
  eyeOpen() {
    if (this.loginPasswordType === 'password') {
      this.loginPasswordType = 'text';
      this.iconEye = 'icon-eyes';
    } else {
      this.loginPasswordType = 'password';
      this.iconEye = 'icon-close-eyes';
    }
  }
  returnLogin() {
    wx.redirectTo({ url: '../../logon/login/main' });
  }
  async handleRegister() {
    // const { error } = Joi.validate(
    //   {
    //     usercard: this.usercard,
    //     password: this.password,
    //     confirmPassword: this.confirmPassword,
    //     username: this.username
    //   },
    //   registerSchema
    // );
    // if (error && error.details.length >= 1) {
    //   const message = error.details[0].message;
    //   vuxInfo(this, message);
    //   return;
    // }
    let responseValue;
    try {
      // const params = new URLSearchParams();
      // params.append("usercard", this.usercard);
      // params.append("username", this.username);
      // params.append("password", this.password);
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
        // vuxInfo(data.msg, () => {
        //   this.$router.replace(`/`);
        // });
        wx.redirectTo({ url: '../login/main' });
      }
    }
  }
}
