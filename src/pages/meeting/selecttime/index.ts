import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import Time from "@/utils/time.ts";
import { getBookTimeSpace } from "@/api/";
import ActionSheet from "@/components/actionsheet/ActionSheet.vue";
import XHeader from '@/components/xheader/XHeader.vue';
const meetModule = namespace("meeting");
@Component({
  components: {
    ActionSheet,XHeader
  },
  // filters: {
  //   judgeIsToday: function(value: number) {
  //     let today = new Date();
  //     if (value === today.getDate()) {
  //       return "今";
  //     }
  //     return value;
  //   }
  // }
})
export default class SelectTime extends Vue {
  @meetModule.State("weekData") weekData!: any;
  @meetModule.State("dayTime") dayTime!: any;
  @meetModule.State("bookTime") bookTime!: any;
  @meetModule.State("currentday") currentday!: any;
  @meetModule.State("bookLocation") bookLocation!: any;

  @meetModule.Mutation("selectWeek") selectWeek!: (amount: number) => void;
  @meetModule.Mutation("setdayTime") setdayTime!: (data: any) => void;
  @meetModule.Mutation("setbookLocation") setbookLocation!: (data: any) => void;
  @meetModule.Mutation("setisBookTimeCertain") setisBookTimeCertain!: (
    data: any
  ) => void;
  @meetModule.Mutation("setbookTime2") setbookTime2!: (data: any) => void;
    private headerOption={
      lefttext: '返回',
      lefticon: '',
      righttext: '完成',
      righticon: '',
    }
  private roomMenu: string[] = ["会议室1", "会议室2", "会议室3"];
  private isShow: boolean = false;
  private mockTime = [
    { startTime: "09:00", endTime: "09:30" },
    { startTime: "11:00", endTime: "12:30" }
  ];
  private returnAddMeet() {
    wx.navigateTo({url:`../addmeet/main`});
  }
  private handleComplate() {}
  async mounted() {
    // 没有选择地点直接进入时默认选择第一项
    if (this.bookLocation === 0) {
      this.setbookLocation(1);
    }
    this.queryState();
    // this.setTodayData(this.mockTime);
  }
  // 请求对应日期房间数据
  private async queryState() {
    // 清空预约时间
    this.setbookTime2({ startTime: "", endTime: "" });
    // 请求数据状态
    // 要不要加0？
    let comitDate = `${this.currentday.year}/${this.currentday.month}/${
      this.currentday.day
    }`;
    let responseValue = await getBookTimeSpace(comitDate, this.bookLocation);
    let { data, status } = responseValue;
    if (status !== 200) {
      alert("请求异常");
    } else {
      console.log(data);
      this.setdayTime(data);
    }
    // let a = [{ startTime: '13:00', endTime: '15:30' }]
    // this.setdayTime(a)
  }
  /**ActionSheet部分 **/
  private handleSelectRoom() {
    this.isShow = true;
  }
  @Emit()
  private handleOptions(value: string) {
    const a = this.roomMenu.indexOf(value) + 1;
    this.setbookLocation(a);
    this.isShow = false;
  }
  @Emit()
  private handleShow(value: boolean) {
    this.isShow = value;
  }
  /**ActionSheet部分 **/
  /** computed*/
  get roomName() {
    return this.roomMenu[this.bookLocation - 1];
  }
  get weekDetail() {
    return this.weekData;
  }
  get timeSlot() {
    let cutSlot:string[] = [];
    for (let i = 0; i < this.dayTime.length; i += 4) {
      cutSlot.push(this.dayTime.slice(i, i + 4));
    }
    return cutSlot;
  }
  get getCurrentDay() {
    let monthValue = this.currentday.month + "月";
    let dayValue = this.currentday.day + "日";
    let weekValue = "周" + this.currentday.week;
    let dateValue = monthValue + dayValue + " " + weekValue;
    return dateValue;
  }
  /** computed*/

  handleSelectTime(value: string) {
    let tempBool = false;
    // currentTime是当前点击块的状态值
    let currentTime = this.dayTime.find(this.hasTimeText(value));
    // unableArr是所有不可用的数组
    let unableArr = this.dayTime.filter(this.hasTimeAble(false));
    if (currentTime.isAble) {
      // 选择一个的情况
      let bStart = Time.getNextTimeSpace(this.bookTime.startTime);
      if (
        bStart === this.bookTime.endTime &&
        Time.compareTime({
          startTime: this.bookTime.startTime,
          endTime: value
        })
      ) {
        let selectspace = Time.getTimeSpace({
          startTime: this.bookTime.startTime,
          endTime: value
        });
        for (let i = 0; i < selectspace.length; i++) {
          if (unableArr.some(this.hasTimeText(selectspace[i]))) {
            tempBool = true;
            // 跳不可选的格时置回单个这种情况
            this.setbookTime2({
              startTime: value,
              endTime: Time.getNextTimeSpace(value)
            });
            break;
          }
        }
        if (!tempBool) {
          this.setbookTime2({
            startTime: this.bookTime.startTime,
            endTime: Time.getNextTimeSpace(value)
          });
        }
      } else {
        this.setbookTime2({
          startTime: value,
          endTime: Time.getNextTimeSpace(value)
        });
      }
    }
  }
  certainBookTime() {
    this.setisBookTimeCertain(true);
    wx.redirectTo({url:`../addmeet/main`});
  }
  hasTimeText(text: string) {
    return (character: any) => character.text === text;
  }
  hasTimeAble(isAble: boolean) {
    return (character: any) => character.isAble === isAble;
  }
  handleSelectDay(index: number) {
    // 设置选中日期
    this.selectWeek(index);
    this.queryState();
  }
  setTodayData(value: any) {
    this.setdayTime(value);
  }
}
