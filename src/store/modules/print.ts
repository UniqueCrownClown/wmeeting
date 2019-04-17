const state = {
  waitingFiles: []
};
const mutations = {
  setWaitingFiles: (state: any, data: any) => {
    state.waitingFiles = data;
  }
};
export default {
  namespaced: true,
  state,
  mutations
};
