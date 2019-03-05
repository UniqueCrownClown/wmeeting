import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import Clock from '@/components/clock/Clock.vue';
import XHeader from '@/components/xheader/XHeader.vue';
import { lightControl, tvControl } from '@/api/';
import { currentIsBefore, currentIsAfter } from '@/utils/time.ts';
const QRCode = require('@/utils/weapp-qrcode.js');
import rpx2px from '@/utils/rpx2px.js';
const meetModule = namespace('meeting');
@Component({
  components: {
    Clock,
    XHeader,
  },
})
export default class DetailMeet extends Vue {
  @meetModule.Getter('showData') meetingData!: any;
  private title: string = '会议详情';
  headerOption = {
    lefttext: '返回',
    lefticon: '',
    righttext: '',
    righticon: '',
  };
  private clockSize: string = '96rpx';
  private roomMenu: string[] = ['会议室1', '会议室2', '会议室3'];
  private lightState: boolean = true;
  private tvState: boolean = false;
  private query: any;
  mounted() {
    console.log(this.detail.token);
    // 300rpx 在6s上为 150px
    const qrcodeWidth = rpx2px(300);
    let qrcode = new QRCode('detailMeet', {
      // usingIn: this,
      text: this.detail.token,
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
    wx.redirectTo({ url: '../meet/main' });
  }
  private async handleLight() {
    // let params = new URLSearchParams();
    // params.append(
    //   'room',
    //   this.showData[this.timeIndex].data[this.dataIndex].room,
    // );
    // params.append('method', this.lightState ? 'Open' : 'Close');
    const params = `room=${
      this.showData[this.timeIndex].data[this.dataIndex].room
    }&method=${this.lightState ? 'Open' : 'Close'}`;
    let responseValue = await lightControl(params);
    console.log(responseValue);
  }
  private async handleDevice(value: string, isUseful: boolean) {
    // alert(isUseful)
    if (!isUseful) {
      // let params = new URLSearchParams();
      // params.append('tvNum', '5');
      // params.append('method', value);
      const params = `tvNum=5&method=${value}`;
      let responseValue = await tvControl(params);
      console.log(responseValue);
    }
  }

  get isUseful() {
    // 已完成
    if (this.tabIndex === 1) {
      return true;
    }
    // 当前时间段
    const date = new Date(this.showData[this.timeIndex].day);
    const startMeetingTime = this.showData[this.timeIndex].data[this.dataIndex]
      .startTime;
    const endMeetingTime = this.showData[this.timeIndex].data[this.dataIndex]
      .endTime;
    if (
      currentIsBefore(date, endMeetingTime) &&
      currentIsAfter(date, startMeetingTime)
    ) {
      return false;
    }
    return true;
  }
  get showData() {
    return this.meetingData(this.tabIndex);
  }
  get detail() {
    let detailData: any = {};
    detailData.day = this.showData[this.timeIndex].day;
    Object.assign(
      detailData,
      this.showData[this.timeIndex].data[this.dataIndex],
    );
    return detailData;
  }

  get timeIndex() {
    let index: any = this.query.fIndex;
    if (typeof index === 'string') {
      index = Number(index);
    }
    return index;
  }
  get dataIndex() {
    let index: any = this.query.cIndex;
    if (typeof index === 'string') {
      index = Number(index);
    }
    return index;
  }
  get tabIndex() {
    let index: any = this.query.tabIndex;
    if (typeof index === 'string') {
      index = Number(index);
    }
    return index;
  }
  onLoad(option) {
    console.log(option);
    this.query = option;
  }
}