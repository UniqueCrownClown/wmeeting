import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { getMeeting, deleteMeet } from '@/api/';
import Clock from '@/components/clock/Clock.vue';
import XHeader from '@/components/xheader/XHeader.vue';
const meetModule = namespace('meeting');
@Component({
  components: {
    Clock,
    XHeader,
  },
})
export default class Meet extends Vue {
  @meetModule.State('user') user!: any;
  @meetModule.Mutation('setmeetingData') setmeetingData!: (data: any) => void;
  @meetModule.Mutation('setshowData') setshowData!: (data: any) => void;
  @meetModule.Getter('showData') showData!: (data: any) => void;
  headerOption = {
    lefttext: '返回首页',
    lefticon: '',
    righttext: '新增',
    righticon: '',
  };
  private headerTab = [
    { text: '已完成', isSelect: true },
    { text: '未完成', isSelect: false },
  ];
  private clockSize: string = '96rpx';
  private roomMenu: string[] = ['会议室1', '会议室2', '会议室3'];
  private tabIndex: number = 0;
  private handleTab(index){
    this.tabIndex = index;
  }
  private switchstate(e: any) {
    if (e.target.nodeName.toLowerCase() === 'span') {
      if (e.target.innerText === '已完成') {
        this.tabIndex = 0;
      }
      if (e.target.innerText === '未完成') {
        this.tabIndex = 1;
      }
    }
  }
  async deleteMeet(type: string) {
    let responseValue;
    responseValue = await deleteMeet(type);
    let { status, data } = responseValue;
    if (status !== 200) {
      alert('服务器异常');
    } else {
      if (data === 'success') {
        this.queryMeetingData();
      }
    }
  }
  onButtonClick(type: string) {
    let _this = this;
    // this.$vux.confirm.show({
    //   title: "取消提示",
    //   content: "残忍取消该预约？",
    //   onConfirm() {
    //     _this.deleteMeet(type);
    //   }
    // });
  }
  toMeetDetail(fIndex: any, cIndex: any) {
    // wx.navigateTo({
    //   path: "/detailMeet",
    //   query: {
    //     tabIndex: this.tabIndex.toString(),
    //     fIndex,
    //     cIndex
    //   }
    // });
    wx.navigateTo({
      url:
        '/pages/meeting/detailMeet/main?tabIndex= this.tabIndex&fIndex=fIndex&cIndex=cIndex',
    });
  }
  private async queryMeetingData() {
    let responseValue = await getMeeting(this.user.usercard);
    console.log(responseValue);
    let { status, data } = responseValue;
    if (status !== 200) {
      alert('请求异常');
    } else {
      this.setmeetingData(data);
    }
  }
  created() {
    this.queryMeetingData();
  }
  activated() {
    this.queryMeetingData();
  }

  get meetingData() {
    return this.showData(this.tabIndex);
  }
  private addMeet() {
    wx.navigateTo({ url: `../addmeet/main` });
  }
  private returnMain() {
    wx.navigateTo({ url: `/pages/main/main` });
  }
}
