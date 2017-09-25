<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 v-for="contest in contests" :key="contest.id" mt-3 >
        <v-card hover class="accent">

          <v-container fluid>
            <v-layout row wrap>
              <!-- title pane -->
              <v-flex d-flex xs12 sm6 md3 class="mb-3">
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-center text-sm-left contest-title">
                    <v-icon>person_pin</v-icon>
                    {{ contest.name }}
                  </v-flex>
                  <v-flex xs12 class="text-xs-center text-sm-left caption">
                    Created by astaves  
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- place pane -->
              <v-flex d-flex xs4 sm3 md2 class="text-xs-center" @click="viewContest(contest.id)">
                <v-layout row wrap>
                  <v-flex xs12>
                    <strong>3rd</strong> / {{ contest.participants.length }}
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
              <v-flex d-flex xs4 sm3 md2 class="text-xs-center" @click="viewContest(contest.id)">
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
              <v-flex d-flex md2 class="hidden-sm-and-down text-xs-center" @click="viewContest(contest.id)">
                <v-layout row wrap>
                  <v-flex xs12>
                    <strong class="primary--text">4</strong> / {{ contest.bets.length }}
                  </v-flex>
                  <v-flex xs12 class="caption">
                    Unresolved
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- place pane -->
              <v-flex d-flex xs4 sm12 md3 class="text-xs-center" @click="viewContest(contest.id)">
                <v-layout row wrap>
                  <v-flex xs12 class="hidden-sm-only caption">
                    12:03 Remaining
                  </v-flex>
                  <v-flex xs12>
                    <v-flex xs12 offset-md4>
                      <v-progress-linear color-front="success" color-back="error" v-model="placePercent"></v-progress-linear>
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>

        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      placePercent: 50,
    };
  },
  computed: {
    contests() {
      return this.$store.getters.loadedContests;
    },
  },
  methods: {
    joinContest(contestId) {
      this.$router.push(`/contests/join/${contestId}`);
      event.preventDefault();
    },
    viewContest(contestId) {
      this.$router.push(`/contests/${contestId}`);
    },
  },
};
</script>


<style scoped>
.contest-title {
  font-size: 1.2em;
}
</style>