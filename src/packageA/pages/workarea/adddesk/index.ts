import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CellItem from '@/components/cellitem/CellItem.vue';
import { bookStation } from '@/api/';
import Calendar from '@/components/calendar/Calendar.vue';
import XHeader from '@/components/xheader/XHeader.vue';
import Time, {
  currentIsBefore,
  currentIsAfter,
  isSameDay,
} from '@/utils/time.ts';
const workModule = namespace('workarea');
const meetModule = namespace('meeting');
@Component({
  components: {
    CellItem,
    Calendar,
    XHeader,
  },
})
export default class AddDesk extends Vue {
  @workModule.Mutation('setdeskBookDateCertain') setdeskBookDateCertain!: (
    payLoad: boolean,
  ) => void;
  @workModule.Mutation('setdeskBookDate') setdeskBookDate!: (
    payLoad: Array<DayObj>,
  ) => void;
  @workModule.Mutation('restoreDeskBookSeatData') restoreDeskBookSeatData!: any;
  @workModule.State('deskBookDate') deskBookDate!: Array<DayObj>;
  @workModule.State('deskBookSeatData') deskBookSeatData!: Array<BookSeatData>;
  @workModule.State('deskBookDateCertain') deskBookDateCertain!: boolean;
  @workModule.State('deskSeatCertain') deskSeatCertain!: boolean;
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
    link: '../selectdesk/main',
  };
  private showCalendar: boolean = false;
  private insertContent() {
    this.showCalendar = true;
  }
  private setdeskBookCalendar(value: Array<DayObj>) {
    this.deskBookCalendar = value;
    this.setdeskBookDate(value);
  }
  handleSelectDesk() {
    wx.redirectTo({ url: `../selectdesk/main` });
  }
  handleSelectTime() {
    this.showCalendar = true;
    this.setdeskBookDateCertain(false);
    // 清除日历选中状态
    this.setdeskBookDate([]);
  }
  getStationValue() {
    if (!this.deskSeatCertain) {
      // 没有确认座位的时候不执行并清空数据
      this.restoreDeskBookSeatData();
      return '';
    }
    let selectOne = this.deskBookSeatData.find(
      (character) => character.isActive === true,
    );
    if (selectOne === undefined || Object.keys(selectOne).length === 0) {
      return '';
    }
    let index = this.deskBookSeatData.indexOf(selectOne) + 1;
    return index.toString();
  }
  private certainTime() {
    // 这里需要校验一下选择时间是否合法
    let start = Time.getFormatDateString(this.deskBookDate[0].day, '-');
    if (currentIsBefore(new Date(start)) || isSameDay(new Date(start))) {
      this.showCalendar = false;
      this.setdeskBookDateCertain(true);
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
            _this.setdeskBookDate([]);
            _this.restoreDeskBookSeatData();
            wx.redirectTo({ url: `../deskbook/main` });
          },
        });
      } else {
        wx.showModal({
          title: '提示',
          content: data.msg,
          showCancel: false,
        });
      }
    }
  }
  backToDesk() {
    wx.redirectTo({ url: `../deskbook/main` });
    // 清除预定的记录
  }
  get deskValue() {
    return this.getStationValue();
  }
  get timeValue() {
    //if (this.deskBookDateCertain) {
    if (this.deskBookDate.length === 2) {
      let start = Time.getFormatDateString(this.deskBookDate[0].day, '.');
      let end = Time.getFormatDateString(this.deskBookDate[1].day, '.');
      return `${start}-${end}`;
    }
    //}
    return '';
  }
}
