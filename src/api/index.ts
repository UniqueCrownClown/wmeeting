import Fly from 'flyio/dist/npm/wx';
import config from '../config';
import ParamsWrapper from '@/utils/paramsWrapper';

// 创建一个flyio的实列
const instance = new Fly();
instance.config.timeout = 5000;
// instance.config.headers['Content-Type'] = 'application/json;charset=UTF-8';
instance.config.headers['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
const getReqParams = (params: any) => {
  const wrapper = new ParamsWrapper(params);
  return wrapper.getValues()
}
// 用户登录
export const login = (params: LoginParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/logon`,
    getReqParams(params));

// 用户注册
export const register = (params: RegisterParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/registration`,
    getReqParams(params)
  );

// 请求会议列表
export const getMeeting = (usercard: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointmentRoom-list/${usercard}`,
  );
// 请求联系人
export const getLinkMan = (usercard: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${config.prefix}/office-usernames/${usercard}`,
  );
// 提交会议预约
export const bookMeeting = (params: BookMeetParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/bookRoom`,
    getReqParams(params));

// 获取被预约的时间段
export const getBookTimeSpace = (bookDate: string, room: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointmentRoom-daily-list/?bookDate=${bookDate}&room=${room}`,
  );
// 管理员开门码
export const getAdminCode = () =>
  instance.get(`${config.IP}:${config.PORT}${config.prefix}/admin-code`);

// 删除会议记录
export const deleteMeet = (id: string) =>
  instance.delete(
    `${config.IP}:${config.PORT}${config.prefix}/appointmentRoom/${id}`,
  );

// 会议室灯光控制
export const lightControl = (params: LightParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/meeting-room-switchs`,
    getReqParams(params)
  );

export const tvControl = (params: TVParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/television`,
    getReqParams(params)
  );

// 工位预约
export const bookStation = (params: BookStationParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/bookStation`,
    getReqParams(params)
  );

// 根据员工工号查询预约工位列表
export const getDeskList = (usercard: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointmentStation-list/${usercard}`,
  );

// 根据开始日期和结束日期获取被占用中的工位列表
export const getDeskState = (startTime: string, endTime: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/station-busy-list/?startTime=${startTime}&endTime=${endTime}`,
  );
// 显示屏扫码后请求使用工位
export const updateDeskState = (token: string, userCard: string) =>
  instance.put(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointmentStation/${token}/userCard/${userCard}`,
  );

// 提前释放工位
export const releaseDesk = (id: string) =>
  instance.delete(
    `${config.IP}:${config.PORT}${config.prefix}/appointmentStation/${id}`,
  );
// 创建一个flyio的实列
const pfly = new Fly();
pfly.config.headers['Content-Type'] = 'application/json;charset=UTF-8';
export const getPosition = (params: Array<ICoordinate>) =>
  pfly.post(`${config.IP}:${config.PORT}/appointment/coordinate`, JSON.stringify(params));


// 云打印
export const getPrintFile = (userCard: string) =>
  instance.get(`${config.IP}:${config.PORT}/office/printer/file/${userCard}`);

export const delPrintFile = (id: string) =>
  instance.delete(`${config.IP}:${config.PORT}/office/printer/file/${id}`);

export const getUploadUrl = `${config.IP}:${config.PORT}/office/printer/file`;

//静态图片的路径
export const staticImage = (fileName: string) => `${config.IP}:${config.PORT}/images/${fileName}`;
