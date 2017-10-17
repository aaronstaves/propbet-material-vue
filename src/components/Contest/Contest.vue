<template>
  <v-container>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
          indeterminate 
          class="primary--text"
          :width="4"
          :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-layout> 
    <v-layout row wrap v-else>
      <v-flex xs12 mt-3 >
        <v-card hover class="accent">

          <v-container fluid>
            <v-layout row wrap>
              <!-- title pane -->
              <v-flex d-flex xs12 class="mb-3">
                <v-layout row wrap>
                  <v-flex xs12 sm7 class="text-xs-center text-sm-left contest-title">
                    <template v-if="true">
                      <app-edit-contest-details-dialog :contest="contest"></app-edit-contest-details-dialog>
                    </template>
                    <v-icon x-large class="hidden-sm-and-down">person_pin</v-icon>
                    {{ contest.title }}
                  </v-flex>
                  <v-flex xs12 sm5>
                    <v-flex xs12 class="text-xs-center text-sm-right">
                      Start: {{ contest.start | date }} 
                    </v-flex>
                    <v-flex xs12 class="text-xs-center text-sm-right">
                      End: {{ contest.end | date }} 
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- place pane -->
              <v-flex d-flex xs4 md3 class="header-data text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12>
                    <strong class="primary--text">{{ userPosition }}</strong> / {{ contest.participants.length }}
                  </v-flex>
                  <v-flex xs12 class="header-caption">
                    Place
                  </v-flex>

                </v-layout>
              </v-flex>

              <!-- bets pane -->
              <v-flex d-flex xs4 md3 class="header-data text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12>
                    <strong class="success--text">{{ contest.bets.length }} </strong> / {{ contest.bets.length }}
                  </v-flex>
                  <v-flex xs12 class="header-caption">
                    Bets
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- unresolved pane -->
              <v-flex d-flex xs4 md3 class="header-data text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12>
                    <strong>{{ unresolvedBets }}</strong> / {{ contest.bets.length }}
                  </v-flex>
                  <v-flex xs12 class="header-caption">
                    Unresolved
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- time remaining pane -->
              <v-flex d-flex xs12 md3 class="header-data text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12 class="hidden-sm-and-down">
                    {{ remainingTimeDisplay}}
                  </v-flex>
                 <v-flex xs12 class="header-caption hidden-md-and-up mt-3">
                   {{ remainingTimeDisplay }}
                  </v-flex>
                  <v-flex xs8 offset-xs2 md12>
                      <v-progress-linear color-front="success" color-back="error" v-model="remainingTimePercent"></v-progress-linear>
                  </v-flex>
                </v-layout>
              </v-flex>              
            </v-layout>
          </v-container>

        </v-card>
      </v-flex>


       <v-flex xs12 mt-3 >
        <v-card hover class="accent">
          <v-container fluid>
            <v-layout row wrap>
              <!-- title pane -->
              <v-flex d-flex xs12 class="mb-3">
                <v-layout row wrap>

                  <!-- leaderboard title -->
                  <v-flex xs12 class="text-xs-center text-sm-left leaderboard-title mb-3">
                    <v-icon x-large class="hidden-xs-only">list</v-icon>
                    Leaderboard
                  </v-flex>

                  <v-flex>
                    <v-data-table
                        v-bind:headers="headers"
                        :items="contest.participants"
                        hide-actions
                        class="elevation-1"
                      >
                      <template slot="items" scope="props">
                        <td class="text-xs-left">{{ props.item.position }}</td>
                        <td class="text-xs-left">
                          <!-- 1st place badge/icon -->
                          <v-icon 
                            large 
                            v-badge="
                              props.item.position === 1 ? 
                              { 
                                value: 'done', 
                                icon: true, 
                                overlap: true, 
                                left: true 
                              } 
                              : null"
                            class="grey--text text--lighten-1 success--after"
                          >
                            account_circle
                          </v-icon>
                          {{ props.item.name }}
                        </td>
                        <td class="text-xs-left">{{ props.item.score }}</td>
                      </template>
                    </v-data-table>
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
      visible: false,
      headers: [
        { text: 'position', value: 'position', align: 'left' },
        { text: 'user', value: 'name', align: 'left' },
        { text: 'score', value: 'score', align: 'left' },
      ],
    };
  },
  props: ['id'],
  computed: {
    loading() {
      // account for case when contest is still loading
      if (this.contest === null || this.contest === undefined) {
        return true;
      }
      return this.$store.getters.loading;
    },
    contest() {
      return this.$store.getters.loadedContests.find(contest => contest.id === this.id);
    },
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
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.contest.creatorId;
    },
  },
};
</script>

<style scoped>
.contest-title {
  font-size: 2.5em;
}
.header-data {
  font-size: 1.5em;
}
.header-caption {
  font-size: 0.5em;
}

.leaderboard-title {
  font-size: 1.5em;
}
</style>
