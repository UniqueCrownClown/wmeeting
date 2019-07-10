import XHeader from '@/components/xheader/XHeader.vue';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const meetModule = namespace('meeting');
@Component({
  components: {
    XHeader,
  },
})
export default class Mine extends Vue {
  private token: string = '';
  private title: string = '我的';
  headerOption = {
    lefttext: '返回',
    lefticon: 'icon-leftarrow',
    righttext: '',
    righticon: '',
  };
  @meetModule.State('user') user!: IUser;
  private returnLogin() {
    // 路由置回登陆界面，清除vuex
    wx.navigateBack();
  }
}
