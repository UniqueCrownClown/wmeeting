import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const meetModule = namespace('meeting');
@Component
export default class Login extends Vue {
  // A4407,123456
  // A5673,xzja5673
  private username: string = '';
  private password: string = '';
  private iconEye: string = 'icon-close-eyes';
  private showPassword: boolean = true;
  private isRemember: boolean = false;
  private items = [{ name: 'isRemember', value: '记住密码', checked: false }];
  @meetModule.Action('asyncsetUser') asyncsetUser!: (
    params: LoginParams,
  ) => void;

  async handleLogin() {
    try {
      if (!new RegExp(/^A\d{4}$/).test(this.username)) {
        wx.showModal({
          title: '提示',
          content: '账号有误,不符合/^Ad{4}$/',
          showCancel: false,
        });
        return;
      }
      const params: LoginParams = {
        staffNum: this.username,
        password: this.password,
      };
      const responseValue: any = await this.asyncsetUser(params);
      if (responseValue.data.status === 'success') {
        //成功登录，是否勾选了记住密码
        if (this.items[0].checked) {
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
      } else {
        wx.showModal({
          title: '提示',
          content: '没有该账号密码记录',
          showCancel: false,
        });
      }
    } catch (err) {
      wx.showToast({ title: err });
    }
  }
  private toRegister() {
    wx.navigateTo({ url: '../register/main' });
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
          const rememberUser = JSON.parse(res.data);
          _this.username = rememberUser.usercard;
          _this.password = rememberUser.password;
          _this.items = [
            { name: 'isRemember', value: '记住密码', checked: true },
          ];
        }
      },
    });
  }
  checkboxChange(e: any) {
    const haha = this.items[0].checked;
    this.items = [{ name: 'isRemember', value: '记住密码', checked: !haha }];
  }
}
