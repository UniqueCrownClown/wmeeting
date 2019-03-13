import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { bookMeeting } from '@/api/';
import CellItem from '@/components/cellitem/CellItem.vue';
import ActionSheet from '@/components/actionsheet/ActionSheet.vue';
import XHeader from '@/components/xheader/XHeader.vue';

const meetModule = namespace('meeting');
@Component({
  components: { CellItem, ActionSheet, XHeader },
})
export default class AddMeet extends Vue {
  @meetModule.State('bookLocation') bookLocation!: any;
  @meetModule.State('bookPersonList') bookPersonList!: any;
  @meetModule.State('bookTime') bookTime!: any;
  @meetModule.State('currentday') currentday!: any;
  @meetModule.State('bookTitle') bookTitle!: any;
  @meetModule.State('isBookTimeCertain') isBookTimeCertain!: any;

  @meetModule.Mutation('setbookLocation') setbookLocation!: (data: any) => void;
  @meetModule.Mutation('setbookPersonList') setbookPersonList!: (
    data: any,
  ) => void;
  @meetModule.Mutation('setbookTitle') setbookTitle!: (data: any) => void;
  @meetModule.Mutation('clearbookTime') clearbookTime!: () => void;

  private cellRoom: CellData = {
    title: '会议室',
    content: '请选择',
  };
  private cellTime: CellData = {
    title: '会议时间',
    content: '请选择',
    link: '../selecttime/main',
  };

  private cellPerson: CellData = {
    title: '参会人员',
    content: '请选择',
    link: '../selectperson/main',
  };
  private title: string = '会议室预约';
  private headerOption = {
    lefttext: '返回',
    lefticon: '',
    righttext: '确定',
    righticon: '',
  };
  private roomMenu: string[] = ['会议室1', '会议室2', '会议室3'];
  private isShow: boolean = false;
  private returnMeet() {
    wx.redirectTo({ url: `../meet/main` });
  }
  private async handleComplate() {
    // 提交之前校验一下
    if (this.subject.trim() === '') {
      wx.showModal({
        title: '提示',
        content: '请先输入标题~~~',
        showCancel: false,
      });
      return;
    }
    if (this.bookLocation === 0) {
      wx.showModal({
        title: '提示',
        content: '请先选择会议室~~~',
        showCancel: false,
      });
      return;
    }
    // 请求时间的月和日需不需要补0？？？
    let comitDay =
      this.currentday.year +
      '/' +
      this.filterlowten(this.currentday.month) +
      '/' +
      this.filterlowten(this.currentday.day);
    // 可以提前半个小時
    let limitTime;
    let timeArr = this.bookTime.startTime.split(':');
    if (Number(timeArr[1]) === 0) {
      limitTime = timeArr[0] + ':30';
    } else {
      let temp = Number(timeArr[0]) + 1;
      limitTime = temp + ':00';
    }
    let myTime = `${comitDay} ${limitTime}`;
    let current = new Date();
    var compareData = new Date(Date.parse(myTime));
    if (compareData < current) {
      wx.showModal({
        title: '提示',
        content: '该时间段不合法,选择正确时间段~~~',
        showCancel: false,
      });
      return;
    }

    let comitPersonList = this.exchangPersonList();
    if (comitPersonList === '请选择') {
      wx.showModal({
        title: '提示',
        content: '参会人员不能为空,请选择~~~',
        showCancel: false,
      });
      return;
    }
    // let params = new URLSearchParams();
    // params.append('subject', this.subject);
    // params.append('room', this.bookLocation);
    // params.append('bookDate', comitDay);
    // params.append('startTime', this.bookTime.startTime);
    // params.append('endTime', this.bookTime.endTime);
    // params.append('participants', comitPersonList);
    console.log(comitDay + comitPersonList);
    const params = `subject=${this.subject}&room=${
      this.bookLocation
    }&bookDate=${comitDay}&startTime=${this.bookTime.startTime}&endTime=${
      this.bookTime.endTime
    }&participants=${comitPersonList}`;
    let responseValue = await bookMeeting(params);
    let { data, status } = responseValue;
    if (status !== 200) {
      wx.showModal({
        title: '提示',
        content: '请求异常',
      });
    } else {
      console.log(data.status + data.msg);
      // 成功提交
      if (data.status === 'success') {
        let _this = this;
        wx.showModal({
          title: '提示',
          content: '恭喜你，预约成功org~~~',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              _this.setbookTitle('');
              _this.setbookLocation(0);
              _this.clearbookTime();
              _this.setbookPersonList([]);
              wx.redirectTo({ url: `../meet/main` });
            }
          },
        });
      }
    }
  }
  private exchangPersonList() {
    let returnValue = '请选择';
    if (this.bookPersonList.length !== 0) {
      returnValue = '';
      this.bookPersonList.forEach((element: string) => {
        returnValue += element + ',';
      });
      returnValue = returnValue.substring(0, returnValue.length - 1);
    }
    return returnValue;
  }

  private filterlowten(value: number) {
    if (value > 0 && value <= 9) {
      return '0' + value.toString();
    }
    return value.toString();
  }

  private insertContent(value: string) {
    this.isShow = true;
  }

  /**ActionSheet部分 **/
  private handleSelectRoom() {
    this.isShow = true;
  }
  private handleOptions(value: string) {
    const a = this.roomMenu.indexOf(value) + 1;
    this.setbookLocation(a);
    this.cellRoom = {
      title: '会议室',
      content: value,
    };
    this.isShow = false;
  }
  private handleShow(value: boolean) {
    this.isShow = value;
  }
  /**ActionSheet部分 **/
  //computed部分
  //计算属性的双向绑定该怎么写？
  // get subject(): any {
  //   return {
  //     get() {
  //       return this.bookTitle;
  //     },
  //     set(val: string) {
  //       this.setbookTitle(val);
  //     }
  //   };
  // }
  private handlebind(e: any) {
    this.setbookTitle(e.target.value);
  }
  get subject() {
    return this.bookTitle;
  }

  get personValue() {
    let returnValue = this.exchangPersonList();
    return returnValue;
  }
  get timeValue() {
    let returnValue = '请选择';
    if (this.isBookTimeCertain) {
      if (this.bookTime.startTime && this.bookTime.endTime) {
        returnValue =
          '周' +
          this.currentday.week +
          '(' +
          this.currentday.month +
          '/' +
          this.currentday.day +
          ')';
        returnValue += this.bookTime.startTime + '-' + this.bookTime.endTime;
      }
    } else {
      this.clearbookTime();
    }

    return returnValue;
  }
  get roomValue() {
    if (this.bookLocation === 0) {
      return '请选择';
    }
    return this.roomMenu[this.bookLocation - 1];
  }
  //computed部分
}
