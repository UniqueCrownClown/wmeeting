import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
//import Joi from "joi";
// import loginSchema from "./login.schema";
const meetModule = namespace("meeting");
@Component
export default class Login extends Vue {
  private username: string = "";
  private password: string = "";
  private iconEye: string = "icon-close-eyes";
  private loginPasswordType: string = "password";
  private isRemember: boolean = false;
  @meetModule.Mutation("asyncsetUser") asyncsetUser!: (
    params: URLSearchParams
  ) => void;

  async handleLogin() {
    // const { error } = Joi.validate(
    //   {
    //     username: this.username,
    //     password: this.password
    //   },
    //   loginSchema
    // );
    // if (error && error.details.length >= 1) {
    //   const detail = error.details[0];
    //   const message = detail.message;
    //   alert(message);
    //   return;
    // }
    try {
      const params = new URLSearchParams();
      params.append("usercard", this.username);
      params.append("password", this.password);
      const responseValue: any = await this.asyncsetUser(params);
      const { status, data } = responseValue;
      if (status !== 200) {
        alert("服务器异常");
      } else {
        if (data.status === "success") {
          if (this.username === "A0000") {
            // this.$router.push(`/supermain`);
          } else {
            wx.redirectTo({url:"../../main/main"});
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
    wx.redirectTo({url:"../register/main"})
  }
  eyeOpen() {
    if (this.loginPasswordType === "password") {
      this.loginPasswordType = "text";
      this.iconEye = "icon-eyes";
    } else {
      this.loginPasswordType = "password";
      this.iconEye = "icon-close-eyes";
    }
  }
}
