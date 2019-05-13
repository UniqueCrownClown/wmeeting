import Fly from 'flyio/dist/npm/wx';
import config from '../config';
import ParamsWrapper from '@/utils/paramsWrapper';

// 创建一个flyio的实列
const instance = new Fly();
instance.config.timeout = 5000;
instance.config.headers['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
const getReqParams = (params: any) => {
  const wrapper = new ParamsWrapper(params);
  return wrapper.getValues()
}
// 用户登录
export const login = (params: LoginParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/user/logon`,
    getReqParams(params));

// 用户注册
export const register = (params: RegisterParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/user/registration`,
    getReqParams(params)
  );

// 请求会议列表
export const getMeeting = (staffNum: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointment/meeting-list/${staffNum}`
  );

// 请求联系人
export const getLinkMan = (query: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${config.prefix}/user/usernames-list/${query}`
  );
// 提交会议预约
export const bookMeeting = (params: BookMeetParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/meeting`,
    getReqParams(params));

// 获取被预约的时间段
export const getBookTimeSpace = (bookDate: string, room: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointment/meeting-daily-list/?meetingDate=${bookDate}&room=${room}`
  );
// 管理员开门码
export const getAdminCode = () =>
  instance.get(`${config.IP}:${config.PORT}${config.prefix}/appointment/admin-code`);

// 删除会议记录
export const deleteMeet = (id: string) =>
  instance.delete(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/meeting/${id}`,
  );

// 会议室灯光控制
export const lightControl = (params: LightParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/meeting-room-switchs`,
    getReqParams(params)
  );

export const tvControl = (params: TVParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/television`,
    getReqParams(params)
  );

// 工位预约
export const bookStation = (params: BookStationParams) =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/station-appointment`,
    getReqParams(params)
  );

// 根据员工工号查询预约工位列表
export const getDeskList = (staffNum: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointment/station-appointment-list/${staffNum}`
  );


// 根据开始日期和结束日期获取被占用中的工位列表
export const getDeskState = (startTime: string, endTime: string) =>
  instance.get(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointment/occupy-station-list?startDate=${startTime}&endDate=${endTime}`
  );

// 显示屏扫码后请求使用工位
export const updateDeskState = (token: string, staffNum: string) =>
  instance.put(
    `${config.IP}:${config.PORT}${
    config.prefix
    }/appointment/station-appointment-report/${token}/${staffNum}`
  );

// 提前释放工位
export const releaseDesk = (id: string) =>
  instance.delete(
    `${config.IP}:${config.PORT}${config.prefix}/appointment/station-appointment/${id}`
  );

// 创建一个flyio的实列
const pfly = new Fly();
pfly.config.headers['Content-Type'] = 'application/json;charset=UTF-8';

export const getPosition = (params: Array<ICoordinate>) =>
  pfly.post(`${config.IP}:${config.PORT}/appointment/coordinate`, JSON.stringify(params));


// 云打印

// 新增场景
export const setPrintScreen = (params: PrintScreenParams) =>
  instance.post(`${config.IP}:${config.PORT}${config.prefix}/printer/print-file-scene`, getReqParams(params));
// 查询场景
export const getPrintScreen = (staffNum: string) =>
  instance.get(`${config.IP}:${config.PORT}${config.prefix}/printer/print-file-scene/${staffNum}`)
// 删除场景
export const delPrintScene = (sceneId: string) =>
  instance.delete(`${config.IP}:${config.PORT}${config.prefix}/printer/print-file-scene/${sceneId}`)
// 查询指定场景id下的文件列表
export const getPrintFile = (sceneId: string) =>
  instance.get(`${config.IP}:${config.PORT}${config.prefix}/printer/file/${sceneId}`)
// 用户删除文件
export const delPrintFile = (fileId: string) =>
  instance.delete(`${config.IP}:${config.PORT}${config.prefix}/printer/file/${fileId}`)

export const getUploadUrl = `${config.IP}:${config.PORT}/office/printer/file`;

//静态图片的路径
export const staticImage = (fileName: string) => `${config.IP}:${config.STATICPORT}/images/${fileName}`;
