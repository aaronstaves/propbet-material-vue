import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

// disable function param reassigns since that's kind
// of what Vuex does

/* eslint-disable no-param-reassign */

export const store = new Vuex.Store({
  state: {
    loadedContests: [],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    createContest(state, payload) {
      state.loadedContests.push(payload);
    },
    setLoadedContests(state, payload) {
      state.loadedContests = payload;
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
    loadContests({ commit }) {
      commit('setLoading', true);
      firebase.database().ref('contests').once('value')
        .then((data) => {
          const obj = data.val();
          const contests = Object.keys(obj).map(key => (
            {
              id: key,
              title: obj[key].title,
              start: new Date(obj[key].start),
              end: new Date(obj[key].end),
              bets: obj[key].bets || [],
              participants: obj[key].particpants || [],
              creatorId: obj[key].creatorId,
            }
          ));
          commit('setLoadedContests', contests);
          commit('setLoading', false);
        })
        .catch((error) => {
          console.dir(error);
          commit('setLoading', false);
        });
    },
    createContest({ commit, getters }, payload) {
      const contestData = {
        title: payload.title,
        start: payload.start.toISOString(),
        end: payload.end.toISOString(),
        bets: [],
        participants: [],
        creatorId: getters.user.id,
      };

      firebase.database().ref('contests').push(contestData)
        .then((response) => {
          commit('createContest', {
            ...contestData,
            id: response.key,
          });
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    signupUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
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
    setUserFromFB({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        joinedContests: [],
      });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
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
