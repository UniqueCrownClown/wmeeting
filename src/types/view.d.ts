//meeting start
declare interface LinkData {
  name: string;
  isCheck?: boolean;
}

declare interface DayObj {
  day: Date;
  isSelect?: boolean;
  date?:string;
  month?:number;
  year?:number;
}

interface Options {
  lefttext: string;
  lefticon: string;
  righttext: string;
  righticon:string;
}
interface Tab {
  text:string;
  isSelect:boolean;
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
  token?:string
}

// meeting end
// workarea start
// workarea end
//print start
declare interface IFileMessage{
  id?: number;
  name:string;
  size:number;
  time:string;
  token?:string;
  isUploaded?:boolean;
  percent?:string;
}

//print end
