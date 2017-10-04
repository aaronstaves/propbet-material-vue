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


      <v-flex xs12 v-if="!loading">
        <contest-list></contest-list>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import ContestList from './ContestList';

export default {
  components: { ContestList },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>