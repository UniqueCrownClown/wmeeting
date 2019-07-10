import { Component, Prop, Vue } from 'vue-property-decorator';
const debug = require('debug')('log:Comp/Calendar');

@Component
export default class Calendar extends Vue {
  @Prop() private deskBookDate!: Array<DayObj>;
  private days: Array<DayObj> = [];
  private currentDay: number = 1;
  private currentMonth: number = 1;
  private currentYear: number = 1970;
  private currentWeek: number = 0;
  private today ={
    year:new Date().getFullYear(),
    month:new Date().getMonth(),
    date:new Date().getDate().toString()}
  // public created() {
  //   // 在vue初始化时调用
  //   this.initData("");
  // }
  onShow() {
    debug('onShow');
  }

  onHide() {
    debug('onHide');
  }

  mounted() {
    // vue hook
    debug('mounted');
    // 在vue初始化时调用
    this.initData('');
  }
  private initData(cur: string) {
    let date;
    if (cur) {
      date = new Date(cur);
    } else {
      let now = new Date();
      let d = new Date(
        this.formatDate(now.getFullYear(), now.getMonth() + 1, 1),
      );
      d.setDate(35);
      date = new Date(this.formatDate(d.getFullYear(), d.getMonth(), 1));
    }
    this.currentDay = date.getDate();
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;

    this.currentWeek = date.getDay() + 1; // 1...6,0
    if (this.currentWeek === 1) {
      this.currentWeek = 8;
    }
    let str = this.formatDate(
      this.currentYear,
      this.currentMonth,
      this.currentDay,
    );
    this.days.length = 0;
    // 今天是周日，放在第一行第7个位置，前面6个
    // 初始化本周
    for (let i = this.currentWeek - 1; i >= 0; i--) {
      let d = new Date(str);
      d.setDate(d.getDate() - i);
      let dayobject: DayObj = {
        day: d,
        isSelect: false,
        date: d.getDate().toString(),
        year:d.getFullYear(),
        month:d.getMonth()
      };
      this.days.push(dayobject); // 将日期放入data 中的days数组 供页面渲染使用
      // console.log(this.days);
    }
    // 其他周
    for (let i = 1; i <= 35 - this.currentWeek; i++) {
      let d = new Date(str);
      d.setDate(d.getDate() + i);
      let dayobject: DayObj = {
        day: d,
        isSelect: false,
        date: d.getDate().toString(),
        year:d.getFullYear(),
        month:d.getMonth()
      };
      this.days.push(dayobject);
    }
  }
  private pickPre(year: number, month: number) {
    // setDate(0); 上月最后一天
    // setDate(-1); 上月倒数第二天
    // setDate(dx) 参数dx为 上月最后一天的前后dx天
    var d = new Date(this.formatDate(year, month, 1));
    d.setDate(0);
    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
  }
  private pickNext(year: number, month: number) {
    var d = new Date(this.formatDate(year, month, 1));
    d.setDate(35);
    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
  }
  private pickYear() {}
  private handleSelect(dayobject: DayObj) {
    let value = dayobject;
    let index = this.days.indexOf(value);
    value.isSelect = true;
    this.days[index] = value;
    if (this.deskBookDate.length === 0) {
      this.$emit('setdeskBookDate', [dayobject, dayobject]);
    } else if (this.deskBookDate[0] === this.deskBookDate[1]) {
      let first =
        dayobject.day > this.deskBookDate[0].day
          ? this.deskBookDate[0].day
          : dayobject.day;
      let last =
        dayobject.day > this.deskBookDate[1].day
          ? dayobject.day
          : this.deskBookDate[1].day;
      for (let i = 0; i < this.days.length; i++) {
        if (this.days[i].day > first && this.days[i].day < last) {
          let a = this.days[i];
          Object.assign(a, { isSelect: true });
          // this.days[i].isSelect = true
          Vue.set(this.days, i, a);
        }
      }
      if (dayobject.day > this.deskBookDate[0].day) {
        this.$emit('setdeskBookDate', [this.deskBookDate[0], dayobject]);
      } else {
        this.$emit('setdeskBookDate', [dayobject, this.deskBookDate[1]]);
      }
    } else {
      this.days.forEach((element) => {
        element.isSelect = false;
      });
      this.$emit('setdeskBookDate', []);
    }
  }
  // 返回 类似 2016-01-02 格式的字符串
  private formatDate(year: number, month: number, day: number) {
    let y = year;
    let m = month;
    let d = day;
    let tempm: string = m.toString(),
      tempd: string = d.toString();
    if (m < 10) tempm = '0' + m;
    if (d < 10) tempd = '0' + d;

    return `${y}/${tempm}/${tempd}`;
  }
}
