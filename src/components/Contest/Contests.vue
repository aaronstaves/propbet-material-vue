<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 v-for="contest in contests" :key="contest.id" mt-3 >
        <v-card hover class="secondary">
          <v-card-title class="contest-title title accent">
            {{contest.name}}
            <v-spacer></v-spacer>
            {{contest.start}}
          </v-card-title>
          <v-container fluid>

            <v-layout row wrap class="white--text">
              <!-- participants pane -->
              <v-flex d-flex xs6 sm6 md4 class="text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12 style="margin: auto">
                    {{ contest.participants.length }} Participants
                    <v-icon right dark>group</v-icon> 
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- bets pane -->
              <v-flex d-flex xs6 sm6 md4 class="text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12 style="margin: auto">
                    {{ contest.bets.length }} Bets
                    <v-icon right dark>import_contacts</v-icon>
                  </v-flex>
                </v-layout>
              </v-flex>
              
              <!-- actions pane -->
              <v-flex d-flex xs12 sm12 md4 class="text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-btn flat class="yellow--text">
                      Join
                      <v-icon right dark class="yellow--text">play_circle_outline</v-icon>
                    </v-btn>
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
      contests: [],
    };
  },
  created() {
    const newContests = [];

    newContests.push({
      id: 1,
      name: 'Contest Week 1',
      start: new Date(),
      participants: [1, 2, 3, 4, 5, 6],
      bets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
    newContests.push({
      id: 2,
      name: 'Contest Week 2',
      start: new Date(),
      participants: [1, 2, 3, 4, 5, 6],
      bets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
    newContests.push({
      id: 3,
      name: 'Contest Week 3',
      start: new Date(),
      participants: [1, 2, 3, 4, 5, 6],
      bets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
    this.contests = newContests;
  },
};
</script>

<<style scoped>
.avatar {
  width: 36px;
  height: 36px;
}
</style>
