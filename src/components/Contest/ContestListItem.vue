<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card hover class="accent" @click="onContestClick(contest.id)">

        <v-container fluid>
          <v-layout row wrap>
            <!-- title pane -->
            <v-flex xs12 class="primary mb-3">
              <v-layout row wrap>
                <v-flex xs12 sm6 class="accent text-xs-center text-sm-left caption">
                  Start: {{ contest.start | date }} 
                </v-flex>
                <v-flex xs12 sm6 class="accent text-xs-center text-sm-right caption">
                  End: {{ contest.end | date }}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex d-flex xs12 md3 class="mb-3">
              <v-layout row wrap>
                <v-flex xs12 class="text-xs-center text-sm-center contest-title">
                  <v-icon>person_pin</v-icon>
                  {{ contest.title }}
                </v-flex>
              </v-layout>
            </v-flex>

            <!-- right side of title -->
            <v-flex xs12 md9 v-if="userPosition === 0">
              <v-layout row wrap>
                <v-flex xs12>
                  <p class="join-contest primary--text text-xs-center">
                    Join Contest
                  </p>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs12 md9 v-else @click="viewContest(contest.id)">
              <v-layout row wrap>
                <!-- place pane -->
                <v-flex d-flex xs4 sm4 md2 class="text-xs-center">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <strong class="primary--text">3rd</strong> / {{ contest.participants.length }}
                    </v-flex>
                    <v-flex xs12 class="caption">
                      Place
                    </v-flex>
                    <v-flex xs12>
                      <v-flex xs4 offset-xs4>
                        <v-progress-linear v-model="placePercent"></v-progress-linear>
                      </v-flex>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <!-- bets pane -->
                <v-flex d-flex xs4 sm4 md2 class="text-xs-center">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <strong class="success--text">6</strong> / {{ contest.bets.length }}
                    </v-flex>
                    <v-flex xs12 class="caption">
                      Bets
                    </v-flex>
                  </v-layout>
                </v-flex>

                <!-- unresolved pane -->
                <v-flex d-flex xs4 sm4 md2 class="text-xs-center">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <strong>{{ unresolvedBets }} </strong> / {{ contest.bets.length }}
                    </v-flex>
                    <v-flex xs12 class="caption">
                      Unresolved
                    </v-flex>
                  </v-layout>
                </v-flex>

                <!-- place pane -->
                <v-flex d-flex xs12 md6 class="text-xs-center">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-flex xs12 md8 offset-md2>
                        <v-progress-linear color-front="success" color-back="error" v-model="remainingTimePercent"></v-progress-linear>
                      </v-flex>
                    </v-flex>
                      <v-flex xs12 md8 offset-md2 class="caption">
                        {{ remainingTimeDisplay }}
                    </v-flex>
                  </v-layout>
                </v-flex>


              </v-layout>
            </v-flex>


          </v-layout>
        </v-container>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['contest'],
  data() {
    return {
      placePercent: 50,
    };
  },
  computed: {
    unresolvedBets() {
      return this.$store.getters.unresolvedBets(this.contest.id);
    },
    userPosition() {
      return this.$store.getters.userPosition(this.contest.id);
    },
    remainingTimePercent() {
      return this.$store.getters.remainingTimePercent(this.contest.id);
    },
    remainingTimeDisplay() {
      return this.$store.getters.remainingTimeDisplay(this.contest.id);
    },
  },
  methods: {
    onContestClick(contestId) {
      if (this.userPosition === 0) {
        this.joinContest(contestId);
      } else {
        this.viewContest(contestId);
      }
    },
    viewContest(contestId) {
      this.$router.push(`/contests/${contestId}`);
    },
    joinContest(contestId) {
      this.$store.dispatch('joinContest', {
        contestId,
        userId: this.$store.getters.user.id,
      });
    },
  },
};
</script>


<style scoped>
.contest-title {
  font-size: 1.2em;
}
.join-contest {
  font-size: 1.5em;
  font-weight: bold;
}
</style>
