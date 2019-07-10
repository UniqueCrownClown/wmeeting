import XHeader from '@/components/xheader/XHeader.vue';
import XTabBar from '@/components/tabBar/XTabBar.vue';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const meetModule = namespace('meeting');
@Component({
  components: {
    XHeader,XTabBar
  }
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
    wx.navigateBack();
  }
}
