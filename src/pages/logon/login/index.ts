import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const meetModule = namespace('meeting');
@Component
export default class Login extends Vue {
  private username: string = 'A4407';
  private password: string = '123456';
  private iconEye: string = 'icon-close-eyes';
  private showPassword: boolean = true;
  private isRemember: boolean = false;
  @meetModule.Action('asyncsetUser') asyncsetUser!: (
    params: LoginParams,
  ) => void;

  async handleLogin() {
    try {
      if (!new RegExp(/^A\d{4}$/).test(this.username)) {
        wx.showModal({
          title: '提示',
          content: '账号有误，请重新检查~~~',
          showCancel: false,
        });
      }
      const params: LoginParams = {
        usercard: this.username,
        password: this.password,
      };

      const responseValue: any = await this.asyncsetUser(params);
      if (responseValue !== 'fail') {
        //成功登录，是否勾选了记住密码
        if (this.isRemember) {
          wx.setStorage({
            key: 'login',
            data: JSON.stringify({
              usercard: this.username,
              password: this.password,
            }),
            success: () => {
              console.log('remenberPassword success');
            },
            fail: () => {
              console.log('remenberPassword fail');
            },
          });
        } else {
          wx.getStorage({
            key: 'login',
            success(res: any) {
              console.log(res.data);
              try {
                wx.removeStorageSync('login');
              } catch (e) {
                console.log(e);
              }
            },
          });
        }
        if (this.username === 'A0000') {
          wx.redirectTo({ url: '../../superman/main' });
        } else {
          wx.redirectTo({ url: '../../main/main' });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  private toRegister() {
    wx.redirectTo({ url: '../register/main' });
  }
  private eyeOpen() {
    if (this.showPassword) {
      this.showPassword = !this.showPassword;
      this.iconEye = 'icon-eye';
    } else {
      this.showPassword = !this.showPassword;
      this.iconEye = 'icon-close-eyes';
    }
  }
  mounted() {
    const _this = this;
    wx.getStorage({
      key: 'login',
      success(res: any) {
        if (res.data !== undefined) {
          console.log(res.data);
          _this.username = 'A4407';
          _this.password = '123456';
          _this.isRemember = true;
        }
      },
    });
  }
}
