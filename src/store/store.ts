import Vue from 'vue';
import Vuex from 'vuex';
import meeting from './modules/meeting';
import workarea from './modules/workarea';
import print from './modules/print'
Vue.use(Vuex as any);

const store = new Vuex.Store({
  state: {
    currentTab: 'homePage'
  },
  mutations: {
    setCurrentTab: (state: any, payLoad: string) => {
      state.currentTab = payLoad;
    }
  },
  modules: {
    meeting,
    workarea,
    print
  },
});

export default store;
