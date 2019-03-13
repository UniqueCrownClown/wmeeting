import { Component, Vue } from 'vue-property-decorator';
import { register } from '@/api';
import XHeader from '@/components/xheader/XHeader.vue';

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
      this.iconEye = 'icon-eye';
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
          title: '密码不一致~~~',
          duration: 3000,
        });
        return;
      }
      if (!new RegExp(/^A\d{4}$/).test(this.usercard)) {
        wx.showToast({
          title: '请以格式/^Ad{4}$/注册账号',
          duration: 3000,
        });
        return;
      }
      const params: RegisterParams = {
        usercard: this.usercard,
        username: this.username,
        password: this.password,
      };
      responseValue = await register(params);
    } catch (err) {
      wx.showModal({
        title: '提示',
        content: err,
      });
      return;
    }
    let { status, data } = responseValue;
    if (status !== 200) {
      wx.showModal({
        title: '提示',
        content: '服务器异常',
      });
    } else {
      if (data.status === 'fail') {
        wx.showModal({
          title: '提示',
          content: data.msg,
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '注册成功org~~~',
          showCancel: false,
          success(res: any) {
            if (res.confirm) {
              wx.redirectTo({ url: '../login/main' });
            }
          },
        });
      }
    }
  }
}
