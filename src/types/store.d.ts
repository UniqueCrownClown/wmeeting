interface IUser {
  staffNum: string;
  username: string;
}
interface IBookTime {
  startTime?: string;
  endTime?: string;
}
interface ITimeData {
  year: number;
  month: number;
  day: number;
  week: string;
  lunar: string;
  isActive: boolean;
}
interface ITimeBlockData {
  text: string;
  isAble: boolean;
  isSelect: boolean;
}

interface MeetingState {
  user: IUser;
  filterData: Array<SortMeetData>;
  bookTitle: string;
  bookLocation: number; // 预约位置
  bookPersonList: Array<string>; // 预约参会人员
  bookTime: IBookTime; // 预约时间段
  currentday: ITimeData; // 预约日期
  weekData: Array<ITimeData>; // 存一下当前点击请求的日期
  dayTime: Array<ITimeBlockData>; // 存储当前日期的时间段状态
  isBookTimeCertain: boolean; // 是否确认预约时间选择
}
declare type BookPersonList = string[];
type DeskBookStation = '1' | '2' | '3' | '4'
interface DeskBookRecordItem {
  id: number,
  station: DeskBookStation,
  deskNumber: string,
  startTime: string,
  endTime: string,
  occupy: string,
  state: string
}
interface BookSeatData {
  name: string,
  isActive: boolean,
  isAble: boolean
}

interface IPosition {
  topValue: string,
  leftValue: string
}

interface WorkAreaState {
  deskBookRecord: Array<ResponseStation>,
  deskBookDateCertain: boolean, // 是否确认提交
  deskSeatCertain: boolean, // 是否确认选择位置
  deskBookDate: Array<DayObj>, // 预约时间数组
  deskBookSeatData: Array<BookSeatData>,
  position: IPosition
}

