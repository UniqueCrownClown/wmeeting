import Vue from 'vue';
import Vuex from 'vuex';
import meeting from './modules/meeting';
import workarea from './modules/workarea';

Vue.use(Vuex as any);

const store = new Vuex.Store({
  modules: {
    meeting,
    workarea,
  },
});

export default store;
