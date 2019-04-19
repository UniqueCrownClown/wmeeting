//week.ts
declare interface DetailItem {
  year: number,
  month: number,
  day: number,
  week: string,
  lunar: string,
  isActive: boolean,
}
declare type ShaSha = string;
//time.ts
interface TimeItem {
  text: string,
  isAble: boolean,
  isSelect: boolean
}
interface TimeSpace {
  startTime: string,
  endTime: string
}
//const.ts
declare type IComposeFn = (...args: any) => any;
