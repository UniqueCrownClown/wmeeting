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
