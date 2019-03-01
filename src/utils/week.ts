import Lunar from './lunar';
const getTodayData = () => {
  let today = formatDate(new Date());
  today.isActive = true;
  return today;
};
const getWeekData = () => {
  let detail:Array<any> = [];
  let date = getFirstDay();
  for (var i = 0; i < 7; i++) {
    detail.push(formatDate(i === 0 ? addDate(date, -1) : addDate(date, 1)));
  }
  // detail这里给个filter
  let day = new Date().getDate();
  for (i = 0; i < detail.length; i++) {
    if (detail[i].day === day) {
      // detail[i].day = '今'
      detail[i].isActive = true;
    }
  }
  return detail;
};
const getFirstDay = () => {
  let date = new Date();
  let week = date.getDay() - 1;
  date = addDate(date, week * -1);
  return new Date(date);
};
const addDate = (date: Date, n: number) => {
  date.setDate(date.getDate() + n);
  return date;
};

const formatDate = (date: Date) => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  // var week = '(' + ['日', '一', '二', '三', '四', '五', '六'][date.getDay()] + ')'
  var week = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
  var lunar = Lunar.GetLunarDay(year, month, day);
  return {
    year: year,
    month: month,
    day: day,
    week: week,
    lunar: lunar,
    isActive: false,
  };
};
export default {
  getWeekData,
  getTodayData,
};
