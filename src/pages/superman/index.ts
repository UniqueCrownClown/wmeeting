import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import XHeader from '@/components/xheader/XHeader.vue';
const QRCode = require('@/utils/weapp-qrcode.js');
import rpx2px from '@/utils/rpx2px.js';
const meetModule = namespace('meeting');
@Component({
  components: {
    XHeader,
  },
})
export default class SuperMan extends Vue {
  private token: string = '';
  private title: string = '超级开门码';
  headerOption = {
    lefttext: '返回',
    lefticon: 'icon-leftarrow',
    righttext: '',
    righticon: '',
  };
  @meetModule.Mutation('setuser') setuser!: (params: any) => void;
  private returnLogin() {
    // 路由置回登陆界面，清除vuex
    const user:IUser = {
      staffNum: '',
      username: '',
    };
    this.setuser(user);
    wx.redirectTo({ url: '../logon/login/main' });
  }
  async mounted() {
    // 300rpx 在6s上为 150px
    const qrcodeWidth = rpx2px(300);
    new QRCode('detailMeet', {
      // usingIn: this,
      text: this.token,
      width: qrcodeWidth,
      height: qrcodeWidth,
      colorDark: '#333333',
      colorLight: 'white',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
}
