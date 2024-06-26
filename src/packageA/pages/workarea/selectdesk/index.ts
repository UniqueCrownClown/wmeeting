import { getDeskState } from '@/api/';
import XHeader from '@/components/xheader/XHeader.vue';
import Time from '@/utils/time.ts';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    XHeader,
  },
})
export default class SelectDesk extends Vue {
  private deskBookSeatData: Array<BookSeatData> = [
    {
      name: '1号',
      isActive: false,
      isAble: true
    },
    {
      name: '2号',
      isActive: false,
      isAble: true
    },
    {
      name: '3号',
      isActive: false,
      isAble: true
    },
    {
      name: '4号',
      isActive: false,
      isAble: true
    }
  ]; // 当前所有工位状态
  private title: string = '工位选择';
  private headerOption = {
    lefttext: '返回',
    lefticon: 'icon-leftarrow',
    righttext: '确定',
    righticon: '',
  };
  query: any;
  deskBookDate: undefined | Array<DayObj>;
  mounted() {
    this.initQuery();
  }
  async initQuery() {
    this.query = this.$root.$mp.query;
    const data2 = JSON.parse(this.query.data);
    this.deskBookDate = data2 && data2.data;

    if (this.deskBookDate === undefined || this.deskBookDate.length === 0) {
      wx.showModal({
        title: '提示',
        content: '请先选择预定时间~~~',
        showCancel: false,
        success(res) {
          wx.redirectTo({ url: '../adddesk/main' });
        },
      });
    } else {
      const haha = this.deskBookDate;
      //month+1
      const haha_month = [(haha[0].month as any) + 1, (haha[1].month as any) + 1]
      let start = `${haha[0].year}/${haha_month[0]}/${haha[0].date}`;
      let end = `${haha[1].year}/${haha_month[1]}/${haha[1].date}`;
      let responseValue = await getDeskState(start, end);
      console.log(responseValue);
      let { status, data } = responseValue;
      if (status !== 200) {
        wx.showModal({
          title: '提示',
          content: '请求异常',
        });
      } else {
        this.setunableBookSeatData(data);
      }
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
    const data = this.getStationValue();
    if (data === '') {
      wx.showModal({
        title: '提示',
        content: '请先选择工位~~~',
        showCancel: false,
      });
      return;
    }
    wx.redirectTo({ url: `../adddesk/main?data=${data}` });
    this.deskBookSeatData.forEach(element => element.isActive = false);
  }
  private returnAddDesk() {
    wx.redirectTo({ url: '../adddesk/main' });
  }

  private setdeskBookSeatData(data: Array<BookSeatData>) {
    this.deskBookSeatData = data;
  }

  private setunableBookSeatData(data: Array<string>) {
    // 用index 来实现挂钩
    data.forEach(element => {
      this.deskBookSeatData[parseInt(element) - 1].isAble = false;
    });
  }

  getStationValue() {
    let selectOne = this.deskBookSeatData.find(
      (character) => character.isActive === true,
    );
    if (selectOne === undefined || Object.keys(selectOne).length === 0) {
      return '';
    }
    let index = this.deskBookSeatData.indexOf(selectOne) + 1;
    return index.toString() + '号工位';
  }
}
