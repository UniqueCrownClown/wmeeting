import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
//import Joi from "joi";
// import loginSchema from "./login.schema";
const meetModule = namespace('meeting');
@Component
export default class Login extends Vue {
  private username: string = 'A4407';
  private password: string = '123456';
  private iconEye: string = 'icon-close-eyes';
  private showPassword: boolean = true;
  private isRemember: boolean = false;
  @meetModule.Action('asyncsetUser') asyncsetUser!: (params: any) => void;

  async handleLogin() {
    try {
      if(!new RegExp(/^A\d{4}$/).test(this.username)){
        wx.showModal({
          title: '提示',
          content: '账号有误，请重新检查~~~',
          showCancel: false,
        });
      }
      const params =`usercard=${this.username}&password=${this.password}`;

      const responseValue: any = await this.asyncsetUser(params);
      const { status, data } = responseValue;
      if (status !== 200) {
        alert('服务器异常');
      } else {
        if (data.status === 'success') {
          if (this.username === 'A0000') {
            wx.redirectTo({ url: '../../superman/main' });
          } else {
            wx.redirectTo({ url: '../../main/main' });
          }
        } else {
          alert(data.msg);
        }
      }
    } catch (err) {
      alert(err);
    }
  }
  toRegister() {
    wx.redirectTo({ url: '../register/main' });
  }
  eyeOpen() {
    if (this.showPassword) {
      this.showPassword = !this.showPassword;
      this.iconEye = 'icon-eyes';
    } else {
      this.showPassword = !this.showPassword;
      this.iconEye = 'icon-close-eyes';
    }
  }
}
