import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { getDeskState } from '@/api/';
import Time from '@/utils/time.ts';
import XHeader from '@/components/xheader/XHeader.vue';
const workModule = namespace('workarea');
@Component({
  components: {
    XHeader,
  },
})
export default class SelectDesk extends Vue {
  @workModule.State('deskSeatCertain') deskSeatCertain!: boolean;
  @workModule.State('deskBookSeatData') deskBookSeatData!: Array<BookSeatData>;
  @workModule.State('deskBookDate') deskBookDate!: Array<DayObj>;
  @workModule.Mutation('setdeskBookSeatData') setdeskBookSeatData!: (
    payload: Array<BookSeatData>,
  ) => void;
  @workModule.Mutation('setunableBookSeatData') setunableBookSeatData!: (
    payload: Array<string>,
  ) => void;
  @workModule.Mutation('restoreDeskBookSeatData')
  restoreDeskBookSeatData!: () => void;
  @workModule.Mutation('setdeskSeatCertain') setdeskSeatCertain!: (
    payload: boolean,
  ) => void;
  private title: string = '工位选择';
  private headerOption = {
    lefttext: '返回',
    lefticon: 'icon-leftarrow',
    righttext: '确定',
    righticon: '',
  };
  async mounted() {
    if (this.deskBookDate === undefined || this.deskBookDate.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请先选择预定时间~~~',
        showCancel: false,
        success(res) {
          wx.redirectTo({ url: '../adddesk/main' });
        },
      });
      return;
    }
    let start = Time.getFormatDateString(this.deskBookDate[0].day, '/');
    let end = Time.getFormatDateString(this.deskBookDate[1].day, '/');
    let responseValue = await getDeskState(start, end);
    console.log(responseValue);
    let { status, data } = responseValue;
    if (status !== 200) {
      wx.showModal({
        title: '提示',
        content: '请求异常',
      });
    } else {
      this.restoreDeskBookSeatData();
      this.setunableBookSeatData(data);
    }
  }
  private handleSelect(index: number) {
    if (this.deskBookSeatData[index].isAble === false) {
      return;
    }
    let dataList: Array<any> = this.deskBookSeatData;
    dataList.forEach((element) => {
      element.isActive = false;
    });
    dataList[index].isActive = true;
    this.setdeskBookSeatData(dataList);
  }
  private handleComplate() {
    this.setdeskSeatCertain(true);
    wx.redirectTo({ url: '../adddesk/main' });
  }
  private returnAddDesk() {
    wx.redirectTo({ url: '../adddesk/main' });
  }
}
