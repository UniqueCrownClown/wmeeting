declare var require: any;

declare interface ResponseValue {
  status: string | object;
  data: object;
}

//responseQuery
declare interface ResponseMeet {
  id: number,
  subject: string,
  room: string,
  userCard: string,
  token: string,
  bookDate: string,
  startTime: string,
  endTime: string,
  releaseTime: string,
  state: string,
  occupy: string,
  bodyDetected: string,
  participants: string
}

declare interface SortMeetData {
  day: string,
  data: Array<ResponseMeet>
}

declare interface ResponseFileListItem {
  extraName: string
  fileName: string,
  filePath: string,
  id: string,
  md5: string,
  size: number,
  userCard: string,
  token: string,
  uploadTime: string
}

declare interface ResponseStation {
  id: number,
  station: string,
  deskNumber: string,
  startTime: string,
  endTime: string,
  occupy: string,
  state: string
}

declare interface LoginParams {
  usercard: string;
  password: string;
}
declare interface RegisterParams {
  usercard: string;
  username: string;
  password: string;
}

interface LightParams {
  room: string;
  method: LightMethod;
}
interface TVParams {
  tvNum: string;
  method: TVtype;
}
interface BookStationParams {
  userCard: string;
  station: string;
  startTime: string;
  endTime: string;
}
interface ICoordinate {
  name: string,
  mac: string,
  rssi: string
}
declare enum TVtype {
  channel = 'channel',
  ton = 'ton'
}
declare enum LightMethod {
  Open = 'Open',
  Close = 'Close'
}

declare interface BookMeetParams {
  subject: string;
  room: string;
  bookDate: string;
  startTime: string;
  endTime: string;
  participants: string;
}
