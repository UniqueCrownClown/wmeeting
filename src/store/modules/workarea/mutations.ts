import { MutationPayload } from "vuex";

export default {
  setdeskBookDate: (state: any, data: MutationPayload) => {
    state.deskBookDate = data;
  },
  setdeskBookSeatData: (state: any, data: any) => {
    state.deskBookSeatData = data;
  },
  restoreDeskBookSeatData: (state: any) => {
    state.deskBookSeatData.forEach((element: any) => {
      element.isActive = false;
      element.isAble = true;
    });
  },
  setunableBookSeatData: (state: any, data: any) => {
    // 用index 来实现挂钩
    data.forEach((element: any) => {
      state.deskBookSeatData[Number(element) - 1].isAble = false;
    });
  },
  setdeskBookDateCertain: (state: any, data: any) => {
    state.deskBookDateCertain = data;
  },
  setdeskSeatCertain: (state: any, data: any) => {
    state.deskSeatCertain = data;
  },
  setdeskBookRecord: (state: any, data: any) => {
    state.deskBookRecord = data;
  },
  setPosition: (state: any, data: any) => {
    state.position.topValue = data.topValue;
    state.position.leftValue = data.leftValue;
  },
};
