import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedContests: [{
      id: 1,
      name: 'Contest Week 1',
      start: new Date(),
      participants: [1, 2, 3, 4, 5, 6],
      bets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 2,
      name: 'Contest Week 2',
      start: new Date(),
      participants: [1, 2, 3, 4, 5, 6],
      bets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 3,
      name: 'Contest Week 3',
      start: new Date(),
      participants: [1, 2, 3, 4, 5, 6],
      bets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }],
    user: {
      id: 1,
      joinedContests: [
        1,
      ],
    },
  },
  mutations: {},
  actions: {},
  getters: {
    loadedContests(state) {
      return state.loadedContests.sort((a, b) => a.start > b.start);
    },
    loadedContest(state) {
      return contestId => state.loadedContests.find(contest => contest.id === contestId);
    },
  },

});

export default store;
