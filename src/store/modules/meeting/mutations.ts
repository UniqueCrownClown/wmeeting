import Time from '@/utils/time.ts';
import Vue from 'vue';
export default {
  setuser: (state: MeetingState, data: IUser) => {
    state.user = data;
  },
  setmeetingData: (state: MeetingState, data: Array<ResponseMeet>) => {
    let finishArray = data.filter((character) => character.meetingStatus === 2);
    let unfinishArray = data.filter((character) => character.meetingStatus !== 2);
    Vue.set(state.filterData, 0, handlemeetingData(unfinishArray));
    Vue.set(state.filterData, 1, handlemeetingData(finishArray));
  },
  setbookTitle: (state: MeetingState, data: string) => {
    state.bookTitle = data;
  },
  setbookLocation: (state: MeetingState, data: number) => {
    state.bookLocation = data;
  },
  setbookPersonList: (state: MeetingState, data: Array<string>) => {
    state.bookPersonList = data;
  },
  selectWeek: (state: MeetingState, data: any) => {
    state.weekData.forEach((element: any) => {
      element.isActive = false;
    });
    state.weekData[data].isActive = true;
    state.currentday = state.weekData[data];
  },
  setdayTime: (state: MeetingState, data: any) => {
    // 每次调用都置回初始值
    state.dayTime = Time.getTime();
    data.forEach((element: any) => {
      let setIndex: Array<number> = [];
      for (let i = 0; i < state.dayTime.length; i++) {
        if (state.dayTime[i].text === element.startTime) {
          setIndex.push(i);
          // 最后一个时间点是个特例
          if (element.endTime === '21:00') {
            setIndex.push(23);
            break;
          }
        }
        if (state.dayTime[i].text === element.endTime) {
          setIndex.push(i - 1);
          break;
        }
      }
      // 设置一下状态
      for (let i = 0; i < state.dayTime.length; i++) {
        if (i <= setIndex[1] && i >= setIndex[0]) {
          state.dayTime[i].isAble = false;
        }
      }
    });
  },
  setbookTime2: (state: any, data: any) => {
    // 1存储预约时间状态
    state.bookTime = data;
    // 更改一下dayTime的状态
    let a = Time.getTimeSpace(state.bookTime);
    // 删除数组最后一个元素,因为设置状态用不上
    a.pop();
    state.dayTime.forEach((element: any) => {
      element.isSelect = false;
    });
    for (let i = 0; i < state.dayTime.length; i++) {
      for (let j = 0; j < a.length; j++) {
        if (state.dayTime[i].text === a[j]) {
          state.dayTime[i].isSelect = true;
        }
      }
    }
  },
  clearbookTime: (state: any) => {
    // 清空预约时间段
    state.bookTime = {};
  },
  setisBookTimeCertain: (state: any, data: any) => {
    state.isBookTimeCertain = data;
  },
};

const handlemeetingData = (data: Array<ResponseMeet>): Array<SortMeetData> => {
  // 将请求的数据转换为指定格式
  let exchangeDate: Array<string> = [];
  let exchangeData: Array<SortMeetData> = [];
  data.forEach(element => {
    if (!exchangeDate.includes(element.meetingDate)) {
      exchangeDate.push(element.meetingDate);
    }
  });

  exchangeDate = Time.degressDate(exchangeDate);
  for (let i = 0; i < exchangeDate.length; i++) {
    let dataArray = data.filter(
      character => Time.datefilterlowten(character.meetingDate) === exchangeDate[i]
    );
    let temp = {
      day: exchangeDate[i],
      data: dataArray
    };
    exchangeData.push(temp);
  }
  return exchangeData;
  // state.meetingData = exchangeData
};
