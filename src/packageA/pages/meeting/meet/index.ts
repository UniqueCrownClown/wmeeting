import { deleteMeet, getMeeting } from '@/api/';
import Clock from '@/components/clock/Clock.vue';
import XHeader from '@/components/xheader/XHeader.vue';
import { deleteWrap, XXParms } from '@/utils/consts';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const meetModule = namespace('meeting');
@Component({
  components: {
    Clock,
    XHeader,
  },
})
export default class Meet extends Vue {
  @meetModule.State('user') user!: IUser;
  @meetModule.Mutation('setmeetingData') setmeetingData!: (data: Array<ResponseMeet>) => void;
  @meetModule.Getter('showData') showData!: (index: number) => void;
  private headerOption = {
    lefttext: '首页',
    lefticon: 'icon-leftarrow',
    righttext: '新增',
    righticon: 'icon-hao',
  };
  private headerTab = [
    { text: '未完成', isSelect: true },
    { text: '已完成', isSelect: false },
  ];
  private actions = [
    {
      name: '删除',
      color: '#fff',
      fontsize: '32',
      width: 100,
      icon: 'trash',
      background: '#ed3f14',
    },
  ];
  private clockSize: string = '96';
  private roomMenu: string[] = ['会议室1', '会议室2', '会议室3'];
  private tabIndex: number = 0;
  private handleTab(index: number) {
    this.tabIndex = index;
    this.headerTab = [
      { text: '未完成', isSelect: index === 0 ? true : false },
      { text: '已完成', isSelect: index === 1 ? true : false },
    ];
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
  private async deleteMeet(type: string) {
    const responseValue = await deleteMeet(type);
    const { status, data } = responseValue;
    if (status !== 200) {
      wx.showModal({
        title: '提示',
        content: '服务器异常'
      });
    } else {
      if (data === 'success') {
        this.queryMeetingData();
      }
    }
  }
  private showDeleteConfirm(value: string) {
    const params: XXParms = {
      delFn: deleteMeet,
      value: value,
      queryFn: this.queryMeetingData
    };
    deleteWrap(params);
  }

  public toMeetDetail(fIndex: any, cIndex: any) {
    //fIndex(时间序号) cIndex(时间里的数据序号)
    wx.redirectTo({
      url: `../detailmeet/main?tabIndex=${
        this.tabIndex
        }&fIndex=${fIndex}&cIndex=${cIndex}`,
    });
  }
  private async queryMeetingData() {
    try {
      wx.showLoading({ title: '加载中~~' })
      const responseValue: ResponseMeetValue = await getMeeting(this.user.staffNum);
      wx.hideLoading();
      const { status, data } = responseValue;
      if (status !== 200) {
        wx.showModal({
          title: '提示',
          content: '请求异常'
        });
      } else {
        this.setmeetingData(data);
      }
    } catch (e) {
      wx.hideLoading();
      wx.showToast({ title: '服务器异常' });
    }
  }
  mounted() {
    this.queryMeetingData();
  }

  get meetingData() {
    return this.showData(this.tabIndex);
  }
  private addMeet() {
    wx.navigateTo({ url: `../addmeet/main` });
  }
  private returnMain() {
    wx.navigateBack();
  }
}
