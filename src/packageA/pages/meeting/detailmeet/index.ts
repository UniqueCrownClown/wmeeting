import { lightControl, tvControl } from '@/api/';
import Clock from '@/components/clock/Clock.vue';
import XHeader from '@/components/xheader/XHeader.vue';
import rpx2px from '@/utils/rpx2px.js';
import { currentIsAfter, currentIsBefore } from '@/utils/time.ts';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
const QRCode = require('@/utils/weapp-qrcode.js');
@Component({
  components: {
    Clock,
    XHeader,
  },
})
export default class DetailMeet extends Vue {
  private title: string = '会议详情';
  headerOption = {
    lefttext: '返回',
    lefticon: 'icon-leftarrow',
    righttext: '',
    righticon: '',
  };
  private clockSize: string = '96';
  private roomMenu: string[] = ['会议室1', '会议室2', '会议室3'];
  @Prop() private lightState: boolean = true;
  @Prop() private tvState: boolean = false;
  private query: any;
  @Prop() private detail: any;
  @Prop() private isUseful: boolean;
  mounted() {
    // 300rpx 在6s上为 150px
    const qrcodeWidth = rpx2px(300);
    new QRCode('detailMeet', {
      // usingIn: this,
      text: (this.detail as any).qrToken,
      width: qrcodeWidth,
      height: qrcodeWidth,
      colorDark: '#333333',
      colorLight: 'white',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
  private toRoomMap(value: string) {
    wx.redirectTo({
      url: '../../workarea/deskbook/main?currentPosition=5',
    });
  }
  private returnMeeting() {
    wx.navigateBack();
  }
  private async handleLight(e:any) {
    const haha = e.mp.detail.value;
    const params = {
      room: this.detail.room,
      method: haha ? 'Open' : 'Close'
    }
    const response = await lightControl(params as any);
    console.log(response);
  }
  private async handleDevice(value: string, isUseful: boolean) {
    if (!isUseful) {
      const params = {
        tvNum: '5',
        method: value === 'channel' ? 'channel' : 'ton'
      }
      //const params = `tvNum=5&method=${value}`;
      const responseValue = await tvControl(params as any);
      wx.showToast({
        title: responseValue.data,
        duration: 2000,
      });
    }
  }

  getUseful() {
    // 已完成
    if (this.detail.meetingStatus === 2) {
      return true;
    }
    // 当前时间段
    const date = new Date(this.detail.day);
    const startMeetingTime = this.detail.startTime;
    const endMeetingTime = this.detail.endTime;
    if (
      currentIsBefore(date, endMeetingTime) &&
      currentIsAfter(date, startMeetingTime)
    ) {
      return false;
    }
    return true;
  }

  @Watch('query')
  refreshdetail(val: number, oldVal: number) {
    this.detail = this.getDetail();
  }

  getDetail(): any {
    return JSON.parse(this.query.detail);
  }
  onLoad(option) {
    this.query = option;
  }
  onReady() {
    console.log(this.query);
    this.detail = this.getDetail();
    this.isUseful = this.getUseful();
  }
}
