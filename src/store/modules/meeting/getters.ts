const getters = {
  showData(state: any) {
    return function(index: number) {
      return index === 0 ? state.filterData[0] : state.filterData[1];
    };
  },
};

export default getters;
