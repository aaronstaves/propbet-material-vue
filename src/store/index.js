import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import contests from './modules/contests';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */

export const store = new Vuex.Store({
  state: {
    loading: false,
    error: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
  modules: {
    user,
    contests,
  },

});

export default store;
