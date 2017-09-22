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
            <!-- bets pane -->
            <v-flex xs12>
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
  props: ['id'],
  computed: {
    contest() {
      return this.$store.getters.loadedContest(parseInt(this.id, 10));
    },
  },
};
</script>
