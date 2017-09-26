<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 mt-3 >
        <v-card hover class="accent">

          <v-container fluid>
            <v-layout row wrap>
              <!-- title pane -->
              <v-flex d-flex xs12 class="mb-3">
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-center text-sm-left contest-title">
                    <v-icon x-large class="hidden-xs-only">person_pin</v-icon>
                    {{ contest.name }}
                  </v-flex>
                  <v-flex xs12 class="text-xs-center text-sm-left">
                    Created by astaves  
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- place pane -->
              <v-flex d-flex xs4 md3 class="header-data text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12>
                    <strong class="primary--text">3rd</strong> / {{ contest.participants.length }}
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
                    <strong class="success--text">6</strong> / {{ contest.bets.length }}
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
                    <strong>4</strong> / {{ contest.bets.length }}
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
                      12:03 Remaining
                  </v-flex>
                 <v-flex xs12 class="header-caption hidden-md-and-up mt-3">
                      12:03 Remaining
                  </v-flex>
                  <v-flex xs8 offset-xs2 md12>
                      <v-progress-linear color-front="success" color-back="error" v-model="placePercent"></v-progress-linear>
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
      placePercent: 50,
    };
  },
  props: ['id'],
  computed: {
    contest() {
      return this.$store.getters.loadedContest(parseInt(this.id, 10));
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
