import { SwiperListItem } from "@/components/swiperList";

const state:PrintStates = {
  waitingFiles: [],
  currentSceneData: {}
};
const mutations = {
  setWaitingFiles: (state: any, data: Array<IWaitFile>) => {
    state.waitingFiles = data;
  },
  setCurrentSceneData: (state: any, data: SwiperListItem) => {
    state.currentSceneData = data
  }
};
export default {
  namespaced: true,
  state,
  mutations
};
