import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
    user: {
      id: 1,
      joinedContests: [
        1,
      ],
    },
  },
  mutations: {
    createContest(state, contest) {
      state.loadedContests.push(contest);
    },
  },
  actions: {
    createContest({ commit }, contest) {
      // Firebase call
      commit('createContest', contest);
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
  },

});

export default store;
