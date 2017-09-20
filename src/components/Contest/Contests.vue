<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 v-for="n in [1,2,3,4,5]" :key="n" mt-3 >
        <v-card hover class="info">
          <v-container fluid>

            <v-layout row wrap>
              <!-- title pane -->
              <v-flex d-flex xs12 sm12 md4 class="text-xs-center white--text">
                <v-icon dark x-large class="hidden-sm-and-down" style="font-size: 5em" >play_circle_outline</v-icon>
                <h4 style="margin: auto">Week 2 Contest</h4>
              </v-flex>

              <!-- stats pane -->
              <v-flex d-flex xs12 sm12 md4 class="text-xs-center white--text">
                <v-layout row wrap>
                  <v-flex xs12 style="margin: auto">
                    <h2>10</h2>
                    Participants
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- time pane -->
              <v-flex d-flex xs12 sm12 md4 class="text-xs-center white--text">
                <v-layout row wrap>
                  <v-flex xs12>
                    <h2>12 Hours</h2>
                    remaining
                  </v-flex>
                </v-layout>
              </v-flex>
              <!-- action buttons -->
              <v-flex xs12 mt-2>
                <v-card-actions>
                  <v-btn class="accent">Join</v-btn>
                  <v-spacer class="hidden-md-and-up"></v-spacer>
                  <v-btn class="accent">Edit</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>

        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>
