import firebase from 'firebase';

/* eslint-disable no-param-reassign */

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
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
  actions: {
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
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
