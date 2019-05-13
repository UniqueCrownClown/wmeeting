export default {
  setdeskBookDate: (state: WorkAreaState, data: Array<DayObj>) => {
    state.deskBookDate = data;
  },
  setdeskBookSeatData: (state: WorkAreaState, data: Array<BookSeatData>) => {
    state.deskBookSeatData = data;
  },
  restoreDeskBookSeatData: (state: WorkAreaState) => {
    state.deskBookSeatData.forEach(element => {
      element.isActive = false;
      element.isAble = true;
    });
  },
  setunableBookSeatData: (state: WorkAreaState, data: Array<string>) => {
    // 用index 来实现挂钩
    data.forEach(element => {
      state.deskBookSeatData[parseInt(element) - 1].isAble = false;
    });
  },
  setdeskBookDateCertain: (state: WorkAreaState, data: boolean) => {
    state.deskBookDateCertain = data;
  },
  setdeskSeatCertain: (state: WorkAreaState, data: boolean) => {
    state.deskSeatCertain = data;
  },
  setdeskBookRecord: (state: WorkAreaState, data: Array<ResponseStation>) => {
    state.deskBookRecord = data;
  },
  setPosition: (state: WorkAreaState, data: IPosition) => {
    state.position.topValue = data.topValue;
    state.position.leftValue = data.leftValue;
  }
};
