import firebase from 'firebase';

/* eslint-disable no-param-reassign */

export default {
  state: {
    loadedContests: [],
  },
  mutations: {
    createContest(state, payload) {
      state.loadedContests.push(payload);
    },
    setLoadedContests(state, payload) {
      state.loadedContests = payload;
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
  },
  getters: {
    loadedContests(state) {
      // calculated values //
      return state.loadedContests.sort((a, b) => a.start > b.start);
    },
    loadedContest(state) {
      return contestId => state.loadedContests.find(contest => contest.id === contestId);
    },
    unresolvedBets(state, getters) {
      return contestId => getters.loadedContest(contestId).bets.filter(bet => bet.resolved).length;
    },
    remainingTimePercent(state, getters) {
      return (contestId) => {
        const contest = getters.loadedContest(contestId);
        const now = new Date();
        if (contest.start > now) {
          return 100;
        } else if (contest.end < now) {
          return 0;
        }
        return 50;
      };
    },
  },
};
