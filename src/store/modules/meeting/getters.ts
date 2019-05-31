const getters = {
  showData(state: MeetingState) {
    return (index: number): SortMeetData => index === 0 ? state.filterData[0] : state.filterData[1];;
  }
};

export default getters;
