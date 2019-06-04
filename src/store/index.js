import Vue from 'vue';
import Vuex from 'vuex';
import batchInformation from './modules/batchInformation';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    batchInformation
  }
})
