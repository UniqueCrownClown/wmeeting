declare var require: any;

interface LoginParams {
  staffNum: string;
  password: string;
}
interface RegisterParams {
  staffNum: string;
  username: string;
  password: string;
  email?: string;
  department?: string;
}

declare interface ResponseLoginValue {
  status: number;
  data: ResponseLogin;
}
declare interface ResponseLogin{
  data: IUser
  msg: string,
  status:string
}

declare interface ResponseValue {
  status: string | object;
  data: object;
}

//会议预约
declare interface ResponseMeetValue {
  status: number;
  data: Array<ResponseMeet>;
}

declare interface ResponseMeet {
  id: string,
  subject: string,
  meetingDate: string,
  startTime: string,
  endTime: string,
  room: string,
  participants: string,
  qrToken: string,
  meetingStatus: number,
  roomStatus: number
}

declare interface SortMeetData {
  day: string,
  data: Array<ResponseMeet>
}

declare interface BookMeetParams {
  subject: string;
  room: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
  participants: string;
}

declare enum TVtype {
  channel = 'channel',
  ton = 'ton'
}

declare enum LightMethod {
  Open = 'Open',
  Close = 'Close'
}

//工位预约
declare interface sss {
  startTime: string,
  endTime: string
}
type ResponseTimeSpace = Array<sss>

interface LightParams {
  room: string;
  method: LightMethod;
}
interface TVParams {
  tvNum: string;
  method: TVtype;
}
interface BookStationParams {
  staffNum: string;
  stationNum: string;
  startDate: string;
  endDate: string;
}

declare interface ResponseStation {
  qrToken: string,
  startDate: string,
  endDate: string,
  stationNum: string,
  status: number
}

interface ICoordinate {
  name: string,
  mac: string,
  rssi: string
}

declare interface PrintScreenParams {
  staffNum: string,
  sceneName: string
}

declare interface PrintFileResponse {
  status: number;
  data: Array<PrintFileResponseItem>
}
declare interface PrintFileResponseItem {
  extraName: string,
  fileName: string,
  filePath: string,
  id: string,
  md5: string,
  scene: any,
  sceneName: string,
  token: string,
  size: number,
  uploadTime: string
}

declare interface ResponseScreenPrintItem {
  id: string;
  sceneName: string;
  token: string;
  staff: StaffCC;
  fileCount: number;
}
declare interface PrintScreenResponse {
  status: number,
  data: Array<ResponseScreenPrintItem>,
}
