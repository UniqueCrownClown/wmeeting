declare var require: any;

declare interface ResponseValue {
  status: string | object;
  data: object;
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
declare interface BookMeetParams {
  subject: string;
  room: string;
  bookDate: string;
  startTime: string;
  endTime: string;
  participants: string;
}
declare function Ilogin(params: LoginParams): void;
