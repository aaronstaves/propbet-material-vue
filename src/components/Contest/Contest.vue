<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover class="secondary">
          <v-card-title class="title accent">
            {{ contest.name }}
            <v-spacer></v-spacer>
            {{ contest.date }}
          </v-card-title>

          <!-- start lower layout -->
          <v-layout row wrap>

            <!-- participants pane -->
            <v-flex xs6>
              <v-card class="secondary">
                <v-card-title class="title accent--text">Participants</v-card-title>
                <v-flex v-for="user in contest.participants" :key="user" xs12>
                  {{ user }}
                </v-flex>
              </v-card>
            </v-flex>
            
            <!-- bets pane -->
            <v-flex xs6>
              <v-card class="secondary">
                <v-card-title class="title accent--text">Bets</v-card-title>
                <v-flex v-for="bet in contest.bets" :key="bet" xs12>
                  {{ bet }}
                </v-flex>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      contest: {
        id: 1,
        name: 'Contest Week 1',
        start: new Date(),
        participants: [1, 2, 3, 4, 5, 6],
        bets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    };
  },
};
</script>
