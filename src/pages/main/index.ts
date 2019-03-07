import { Component, Prop, Vue } from 'vue-property-decorator';
import VerticalBox from '@/components/verticalbox/VerticalBox.vue';
import XHeader from '@/components/xheader/XHeader.vue';
import ActionSheet from "@/components/actionsheet/ActionSheet.vue"
import { namespace } from 'vuex-class';
const meetModule = namespace('meeting');
@Component({
  components: {
    VerticalBox,
    XHeader,
    ActionSheet
  },
})
export default class XMain extends Vue {
  @meetModule.Action('asyncsetUser') asyncsetUser!: (params: any) => void;
  private title: string = '首页';
  private headerOption = {
    lefttext: '',
    lefticon: '',
    righttext: '更多',
    righticon: '',
  };
  leftevent() {
    console.log('left');
  }
  rightevent() {
    this.isShow = true;
  }
  private isShow = false;
  private showMenu = ['退出登录'];
  private workData: any = [
    {
      name: '会议管理',
      path: require('./../../assets/images/icon-1.png'),
      link: '/packageA/pages/meeting/meet/main',
    },
    {
      name: '办公管理',
      path: require('./../../assets/images/icon-2.png'),
      link: '/packageA/pages/workarea/deskbook/main',
    },
    {
      name: '报销管理',
      path: require('./../../assets/images/icon-3.png'),
      link: '/packageA/pages/workarea/deskbook/main',
    },
  ];
  private lifeData: any = [
    { name: '请假', path: require('./../../assets/images/icon-4.png') },
    { name: '项目', path: require('./../../assets/images/icon-5.png') },
    { name: '合同', path: require('./../../assets/images/icon-6.png') },
    { name: '出差', path: require('./../../assets/images/icon-7.png') },
    { name: '外出登记', path: require('./../../assets/images/icon-8.png') },
    { name: '宿舍入住', path: require('./../../assets/images/icon-9.png') },
  ];
  /**ActionSheet部分 **/
  private handleOptions(value: string) {
    if (value === this.showMenu[0]) {
      // 路由置回登陆界面，清除vuex
      let user = {
        usercard: '',
        username: '',
      };
      this.asyncsetUser(user);
      wx.redirectTo({ url: '../logon/login/main' });
    }
  }
  private handleShow(value: boolean) {
    this.isShow = value;
  }
  /**ActionSheet部分 **/
}
