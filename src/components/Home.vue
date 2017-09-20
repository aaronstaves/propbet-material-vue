<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <h1 class="white--text mb-2 display-3">Propbet App</h1>
        <div class="white--text headline mb-3">Powered by burritos</div>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/contests" class="info"><v-icon left>lock_open</v-icon>Sign in</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/contest/create" class="info"><v-icon left>face</v-icon>Sign up</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
.container {
  background: url('../assets/login-background.jpeg');
  background-position: center;
  background-size: cover;
  background-blend-mode: screen;
  max-width: 4000px;
}
</style>

