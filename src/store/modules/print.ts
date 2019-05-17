import { SwiperListItem } from "@/components/swiperList";

const state = {
  waitingFiles: [],
  currentSceneData: {}
};
const mutations = {
  setWaitingFiles: (state: any, data: any) => {
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
