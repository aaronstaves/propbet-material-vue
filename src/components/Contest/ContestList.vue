<template>
  <v-layout row wrap>

    <!-- no contests -->
    <v-flex xs12>
      <v-card v-if="contests.length == 0" hover class="accent">
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 class="text-xs-center contest-title">
              No contests found
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
    <!-- contest list -->
    <v-flex xs12 v-for="contest in contests" :key="contest.id" mt-3 >
      <contest-item :contest="contest"></contest-item>
    </v-flex>
  </v-layout>
</template>

<script>
import ContestItem from './ContestItem';

export default {
  components: { ContestItem },
  computed: {
    contests() {
      return this.$store.getters.loadedContests;
    },
  },
};
</script>


<style scoped>
.contest-title {
  font-size: 1.2em;
}
</style>
