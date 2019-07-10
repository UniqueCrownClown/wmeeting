import { bookStation } from '@/api/';
import Calendar from '@/components/calendar/Calendar.vue';
import CellItem from '@/components/cellitem/CellItem.vue';
import XHeader from '@/components/xheader/XHeader.vue';
import Time, { currentIsBefore, isSameDay } from '@/utils/time.ts';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const meetModule = namespace('meeting');
@Component({
  components: {
    CellItem,
    Calendar,
    XHeader,
  },
})
export default class AddDesk extends Vue {
  @meetModule.State('user') user!: IUser;
  private title: string = '新增工位预约';
  private headerOption = {
    lefttext: '返回',
    lefticon: 'icon-leftarrow',
    righttext: '完成',
    righticon: '',
  };
  private deskBookCalendar: Array<DayObj> = [];
  private cellTime: CellData = {
    title: '使用日期',
    content: '请选择',
  };
  private cellDesk: CellData = {
    title: '工位选择',
    content: '请选择',
  };
  private showCalendar: boolean = false;
  private query: any;
  private deskBookDate: DayObj[] = [];
  private setdeskBookCalendar(value: Array<DayObj>) {
    this.deskBookCalendar = value;
    this.setdeskBookDate(value);
  }
  handleSelectTime() {
    this.showCalendar = true;
    // 清除日历选中状态
    this.setdeskBookDate([]);
  }
  handleSelectDesk() {
    const haha = {
      data: this.deskBookDate
    }
    const data = JSON.stringify(haha);
    console.log(data);
    wx.redirectTo({ url: `../selectdesk/main?data=${data}` });
  }

  getStationValue() {
    if (this.query.data) {
      //截去'号工位'
      return this.query.data.substring(0,1);
    }
    return '请选择'
  }
  private certainTime() {
    // 这里需要校验一下选择时间是否合法
    let start = Time.getFormatDateString(this.deskBookDate[0].day, '-');
    if (currentIsBefore(new Date(start)) || isSameDay(new Date(start))) {
      this.showCalendar = false;
    } else {
      let _this = this;
      wx.showModal({
        title: '提示',
        content: '选择时间不合法，请重新选择',
        showCancel: false,
        success(res) {
          _this.cancelTime();
        },
      });
    }
  }
  cancelTime() {
    this.showCalendar = false;
    this.setdeskBookDate([]);
  }
  async handleComplate() {
    let responseValue: any;
    try {
      if (this.deskBookDate.length === 0) {
        wx.showModal({
          title: '提示',
          content: '请先选择预约时间！！',
          showCancel: false,
        });
        return;
      }
      const start = Time.getFormatDateString(this.deskBookDate[0].day, '/');
      const end = Time.getFormatDateString(this.deskBookDate[1].day, '/');
      const station = this.getStationValue();
      if (start === '' || end === '') {
        wx.showModal({
          title: '提示',
          content: '请先选择预约时间！！',
          showCancel: false,
        });
        return;
      }
      if (station === '') {
        wx.showModal({
          title: '提示',
          content: '请前往选择工位！！',
          showCancel: false,
        });
        return;
      }
      const params = {
        staffNum: this.user.staffNum,
        stationNum: station,
        startDate: start,
        endDate: end,
      };
      responseValue = await bookStation(params);
    } catch (err) {
      wx.showModal({
        title: '提示',
        content: 'error',
        showCancel: false,
      });
    }
    const { status, data } = responseValue;
    if (status !== 200) {
      wx.showModal({
        title: '提示',
        content: '服务器异常',
      });
    } else {
      if (data.status === 'success') {
        let _this = this;
        wx.showModal({
          title: '提示',
          content: '预定工位成功',
          showCancel: false,
          success(res) {
            // 清空预定时间
            _this.backToDesk();
          },
        });
      } else {
        wx.showModal({
          title: '提示',
          content: data && data.msg,
          showCancel: false,
        });
      }
    }
  }
  backToDesk() {
    wx.redirectTo({ url: `../deskbook/main` });
    // 清除预定的记录
    this.deskBookDate = [];
  }
  get timeValue() {
    if (this.deskBookDate.length === 2) {
      let start = Time.getFormatDateString(this.deskBookDate[0].day, '.');
      let end = Time.getFormatDateString(this.deskBookDate[1].day, '.');
      return `${start}-${end}`;
    }
    return '请选择';
  }
  // onLoad(option: any) {
  //   this.query = option;
  // }
  onShow() {
    console.log(this.$root.$mp.query);
    this.query = this.$root.$mp.query;
    if (Object.keys(this.query).length === 0) {
      this.query.data = '请选择';
    }
  }
  setdeskBookDate(data: Array<DayObj>) {
    this.deskBookDate = data;
  }
}
