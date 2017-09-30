import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

// disable function param reassigns since that's kind
// of what Vuex does

/* eslint-disable no-param-reassign */

const participants = [
  {
    name: 'astaves',
    userId: 1,
  },
  {
    name: 'logan11',

    userId: 2,
  },
  {
    name: 'ss',
    userId: 3,
  },
  {
    name: 'kingthursday',
    userId: 4,
  },
  {
    name: 'deepcrow',
    userId: 5,
  },
];

const bets = [
  {
    text: 'Halftime Song Length (seconds)',
    type: 'over-under',
    break: 150,
    value: 143,
    resolved: true,
  },
  {
    text: 'Aaron Rodgers 300+ Passing',
    type: 'over-under',
    break: 300,
    value: 100,
    resolved: false,
  },
  {
    text: 'First Halftime Song',
    type: 'choice',
    choices: [
      'Poker Face',
      'Just Dance',
      'Bad Romance',
      'Other',
    ],
    value: null,
    resolved: false,
  },
  {
    text: 'Combined Total Score',
    type: 'value',
    value: 12,
    resolved: false,
  },
];

export const store = new Vuex.Store({
  state: {
    loadedContests: [{
      id: 1,
      title: 'Contest Week 1',
      start: new Date(),
      end: new Date(),
      participants,
      bets,
    },
    {
      id: 2,
      title: 'Contest Week 2',
      start: new Date(),
      end: new Date(),
      participants,
      bets,
    },
    {
      id: 3,
      title: 'Contest Week 3',
      start: new Date(),
      end: new Date(),
      participants,
      bets,
    }],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    createContest(state, payload) {
      state.loadedContests.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
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
    createContest({ commit }, payload) {
      // Firebase call
      commit('createContest', payload);
    },
    signupUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            joinedContests: [],
          };
          commit('setUser', newUser);
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
        });
    },
    signinUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        const newUser = {
          id: user.uid,
          joinedContests: [],
        };
        commit('setUser', newUser);
        commit('setLoading', false);
      })
      .catch((error) => {
        commit('setError', error);
        commit('setLoading', false);
      });
    },
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    loadedContests(state) {
      // calculated values //
      return state.loadedContests.sort((a, b) => a.start > b.start);
    },
    loadedContest(state) {
      return contestId => state.loadedContests.find(contest => contest.id === contestId);
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },

});

export default store;
