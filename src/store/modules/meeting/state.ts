import Week from '@/utils/week.ts';
import Time from '@/utils/time.ts';
const initalState: MeetingState = {
  user: {
    usercard: '',
    username: '',
  },
  filterData: [], // 孩子和meetingData格式一致，存放是否完成分类
  bookTitle: '',
  bookLocation: 0, // 预约位置
  bookPersonList: [], // 预约参会人员
  bookTime: { startTime: '', endTime: '' }, // 预约时间段
  currentday: Week.getTodayData(), // 预约日期
  weekData: Week.getWeekData(), // 存一下当前点击请求的日期
  dayTime: Time.getTime(), // 存储当前日期的时间段状态
  isBookTimeCertain: false, // 是否确认预约时间选择
};

export default initalState
