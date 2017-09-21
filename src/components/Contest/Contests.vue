<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 v-for="n in [1,2,3,4,5]" :key="n" mt-3 >
        <v-card hover class="info">
          <v-card-title class="contest-title title accent">Week {{ n }} contest</v-card-title>
          <v-container fluid>

            <v-layout row wrap class="white--text">
              <!-- Leaders -->
              <v-flex d-flex xs12 sm12 md4>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-center">
                    <h6>Leaders</h6>
                  </v-flex>
                  <v-flex xs12 v-for="m in [3,2,1]" :key="m" mt-3>
                    <v-layout row wrap>
                      <v-flex xs12 class="text-xs-center">
                        <v-layout row wrap>

                          <!-- avatar -->
                          <v-flex xs4>
                            <div>
                              <img class="avatar" src="http://68.media.tumblr.com/d467821e248f7a959b501ca90f17f2cb/tumblr_n8d8crh12o1rtbl5vo1_400.gif"> 
                            </div>
                          </v-flex>

                          <!-- name -->
                          <v-flex xs4>
                            Leader 1
                          </v-flex>

                          <!-- points -->
                          <v-flex xs4 class="accent--text">
                            {{m * 5}} points
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- stats pane -->
              <v-flex d-flex xs12 sm12 md4 class="text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12 style="margin: auto">
                    <h2>10</h2>
                    Participants
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- time pane -->
              <v-flex d-flex xs12 sm12 md4 class="text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12 style="margin: auto">
                    <h2>12 Hours</h2>
                    remaining
                  </v-flex>
                </v-layout>
              </v-flex>
              <!-- action buttons -->
              <v-flex xs12 mt-2>
                <v-card-actions style="font-size: 5em">
                  <v-btn flat large class="accent--text">Join</v-btn>
                  <v-spacer class="hidden-md-and-up"></v-spacer>
                  <v-btn flat large class="accent--text">Edit</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>

        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<<style scoped>
.avatar {
  width: 36px;
  height: 36px;
}
</style>
