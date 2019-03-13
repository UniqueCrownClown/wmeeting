import Fly from 'flyio/dist/npm/wx';
import config from '../config';
import ParamsWrapper from '@/utils/paramsWrapper';

// 创建一个flyio的实列
const instance = new Fly();
instance.config.timeout = 5000;
// instance.config.headers['Content-Type'] = 'application/json;charset=UTF-8';
instance.config.headers['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
// 用户登录
export const login = (params: LoginParams) => {
  const wrapper = new ParamsWrapper(params);
  const sss = wrapper.getValues();
  return instance.post(`${config.IP}:${config.PORT}${config.prefix}/logon`, sss);
};
// 用户注册
export const register = (params: RegisterParams) => {
  const wrapper = new ParamsWrapper(params);
  return instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/registration`,
    wrapper.getValues(),
  );
};

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
export const bookMeeting = (params: any) =>
  instance.post(`${config.IP}:${config.PORT}${config.prefix}/bookRoom`, params);
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
export const lightControl = (params: any) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/meeting-room-switchs`,
    params,
  );

export const tvControl = (params: any) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/television`,
    params,
  );

// 工位预约
export const bookStation = (params: any) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/bookStation`,
    params,
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
export const getPosition = (params: any) =>
  pfly.post(`${config.IP}:${config.PORT}/appointment/coordinate`, params);
