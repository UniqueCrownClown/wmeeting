
const getTime = () => {
  let timeSlot = [];
  for (let i = 9; i < 21; i++) {
    let temp = [':00', ':30'];
    let hour = '0';
    for (let j = 0; j < temp.length; j++) {
      if (i === 9) {
        hour = '09';
      } else {
        hour = i.toString();
      }
      let item: any = {};
      item.text = hour + temp[j];

      item.isAble = true;
      item.isSelect = false;
      (timeSlot as any).push(item);
    }
  }
  return timeSlot;
};
const getPrevTimeSpace = (value: string) => {
  let tempArr = value.split(':');
  let nextValue = '';
  if (tempArr[1] === '00') {
    nextValue = (Number(tempArr[0]) - 1).toString() + ':30';
    if (nextValue === '9:30') {
      nextValue = '09:30';
    }
  } else {
    nextValue = tempArr[0] + ':00';
  }
  return nextValue;
};
const getNextTimeSpace = (value: string) => {
  let tempArr = value.split(':');
  let nextValue = '';
  if (tempArr[1] === '00') {
    nextValue = tempArr[0] + ':30';
  } else {
    nextValue = (Number(tempArr[0]) + 1).toString() + ':00';
  }
  return nextValue;
};
const getTimeSpace = (data: any) => {
  let startTime = data.startTime;
  let endTime = data.endTime;
  if (!startTime || !endTime) {
    return [];
  }
  let timeSpace = [];
  let start = startTime.split(':');
  let end = endTime.split(':');
  let temp = [':00', ':30'];
  for (let i = Number(start[0]); i <= Number(end[0]); i++) {
    for (let j = 0; j < temp.length; j++) {
      let perfix = i.toString();
      if (i === 9) {
        perfix = '09';
      }
      (timeSpace as any).push(perfix + temp[j]);
    }
  }
  if (start[1] === '30') {
    timeSpace.shift();
  }
  if (end[1] === '00') {
    timeSpace.pop();
  }
  return timeSpace;
};
// 验证时间格式,正确返回true
const compareTime = (data: any) => {
  let startTime = data.startTime;
  let endTime = data.endTime;
  if (!startTime || !endTime) {
    // endTime空时无条件正确
    return true;
  }
  let start = startTime.split(':');
  let end = endTime.split(':');

  if (
    Number(end[0]) === Number(start[0]) &&
    Number(end[1]) > Number(start[1])
  ) {
    return true;
  }
  if (Number(end[0]) > Number(start[0])) {
    return true;
  }
  return false;
};
// 日期字符串升序排序
const degressDate = (data: Array<any>) => {
  let exchange: Array<Date> = [];
  let returnValue: string[] = [];
  data.forEach((element) => {
    exchange.push(new Date(element));
  });
  // 数组去掉重复日期
  let resultarr = [...new Set(exchange)];
  exchange.sort(function (a, b) {
    return a > b ? 1 : -1;
  });
  exchange.forEach((element) => {
    let month = filterlowten(element.getMonth() + 1);
    let date = filterlowten(element.getDate());
    returnValue.push(`${element.getFullYear()}/${month}/${date}`);
  });
  return [...new Set(returnValue)];
};

// date对象返回指定格式
const getFormatDateString = (date: Date, connector: string) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}${connector}${month}${connector}${day}`;
};

const datefilterlowten = (value: string) => {
  let dateArr = value.split('/');
  let month = filterlowten(Number(dateArr[1]));
  let date = filterlowten(Number(dateArr[2]));
  return `${dateArr[0]}/${month}/${date}`;
};
const filterlowten = (value: number) => {
  if (value > 0 && value <= 9) {
    return '0' + value.toString();
  }
  return value.toString();
};
//卸下moment库自己实现比较入参时间和当前时间的大小
export const currentIsBefore = (value: Date, time?: string) => {
  //Date.now()和Date.parse(value.toUTCString())
  if (time) {
    value.setHours(Number(time.split(':')[0]));
    value.setMinutes(Number(time.split(':')[1]));
  }
  let current = Date.now();
  let compare = Date.parse(value.toUTCString());
  if (current > compare) {
    return false;
  }
  return true;
};
export const currentIsAfter = (value: Date, time?: string) => {
  if (time) {
    value.setHours(Number(time.split(':')[0]));
    value.setMinutes(Number(time.split(':')[1]));
  }
  let current = Date.now();
  let compare = Date.parse(value.toUTCString());
  if (current > compare) {
    return true;
  }
  return false;
};
export const isSameDay = (value: Date, type: string = "day") => {
  const now = new Date();
  if (value.getFullYear() === now.getFullYear()
    && value.getMonth() === now.getMonth()
    && value.getDate() === now.getDate()) {
    return true;
  }
  return false
}

export default {
  getTime,
  getTimeSpace,
  compareTime,
  degressDate,
  getFormatDateString,
  getPrevTimeSpace,
  getNextTimeSpace,
  datefilterlowten,
};
