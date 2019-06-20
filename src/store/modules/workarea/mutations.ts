export default {
  setPosition: (state: WorkAreaState, data: IPosition) => {
    state.position.topValue = data.topValue;
    state.position.leftValue = data.leftValue;
  }
};
