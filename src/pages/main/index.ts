import { Component, Vue } from 'vue-property-decorator';
import VerticalBox from '@/components/verticalbox/VerticalBox.vue';
import XHeader from '@/components/xheader/XHeader.vue';
import ActionSheet from "@/components/actionsheet/ActionSheet.vue"
import { namespace } from 'vuex-class';
import { staticImage } from '@/api'
const meetModule = namespace('meeting');
@Component({
  components: {
    VerticalBox,
    XHeader,
    ActionSheet
  },
})
export default class XMain extends Vue {
  @meetModule.Mutation('setuser') setUser!: (params: IUser) => void;
  private title: string = '首页';
  private headerOption = {
    lefttext: '',
    lefticon: '',
    righttext: '更多',
    righticon: 'icon-shenglve',
  };
  private current = 'homepage';
  handleChange(e: any) {
    //e.mp.detail.key
    this.current = e.mp.detail.key;
    if(this.current !== 'homepage'){
      if(this.current === 'mine'){
        wx.navigateTo({url:'../mine/main'});
        return;
      }
      wx.navigateTo({url:'../other/main'});
    }
  }
  leftevent() {
    console.log('left');
  }
  rightevent() {
    this.isShow = true;
  }
  private isShow = false;
  private showMenu = ['退出登录', '取消'];
  private workData: any = [
    {
      name: '会议管理',
      path: staticImage('icon-1.png'),
      link: '/packageA/pages/meeting/meet/main',
    },
    {
      name: '办公管理',
      path: staticImage('icon-2.png'),
      link: '/packageA/pages/workarea/deskbook/main',
    },
    {
      name: '云打印',
      path: staticImage('icon-3.png'),
      link: '/packageA/pages/print/printScreen/main',
    },
  ];
  private lifeData: any = [
    { name: '请假', path: staticImage('icon-4.png') },
    { name: '项目', path: staticImage('icon-5.png') },
    { name: '合同', path: staticImage('icon-6.png') },
    { name: '出差', path: staticImage('icon-7.png') },
    { name: '外出登记', path: staticImage('icon-8.png') },
    { name: '宿舍入住', path: staticImage('icon-9.png') },
  ];
  onLoad(options: any) {
    wx.showLoading({ title: '加载中' })
  }
  onReady() {
    wx.hideLoading();
  }

  /**ActionSheet部分 **/
  private handleOptions(value: string) {
    if (value === this.showMenu[0]) {
      // 路由置回登陆界面，清除vuex
      let user = {
        staffNum: '',
        username: '',
      };
      this.setUser(user);
      wx.redirectTo({ url: '../logon/login/main' });
    }
  }
  private handleShow(value: boolean) {
    this.isShow = value;
  }
  /**ActionSheet部分 **/
}
