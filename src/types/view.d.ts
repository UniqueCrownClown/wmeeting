//meeting start
declare interface LinkData {
  name: string;
  isCheck?: boolean;
}

declare interface DayObj {
  day: Date;
  isSelect?: boolean;
  date?: string;
  month?: number;
  year?: number;
}

interface Options {
  lefttext: string;
  lefticon: string;
  righttext: string;
  righticon: string;
}
interface Tab {
  text: string;
  isSelect: boolean;
}
// meeting start

declare interface CellData {
  title: string;
  content: string;
  link?: string;
}
interface LinkData {
  name: string;
  isCheck: boolean;
}
interface PingyinData {
  letter: string;
  data: Array<string>;
}
interface ExchangeLinkData {
  letter: string;
  data: Array<LinkData>;
}
interface DetailMeet {
  token?: string
}

declare interface IFileMessage {
  unique:string;//刷新的唯一键值= name+percent
  id?: string;
  name: string;
  size: number | string;
  time: string;
  token?: string;
  isUploaded?: boolean;
  percent?: string;
}
declare interface IChooseItem {
  name: string;
  path: string;
  size: number;
  type: string;
}

//print end
