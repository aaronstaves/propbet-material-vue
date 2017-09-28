<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primary--text">Create new contest</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateContest">
          
          <!-- title -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- start date and time -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4 class="primary--text">Start Date and Time</h4>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 offset-sm3 md2 offset-md3 lg1>
              <v-date-picker v-model="startDate"></v-date-picker>
            </v-flex>
            <v-flex xs12 offset-sm3 md3>
              <v-time-picker v-model="startTime"></v-time-picker>
            </v-flex>
          </v-layout>


          <!-- end date and time -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mt-4">
              <h4 class="primary--text">End Date and Time</h4>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 offset-sm3 md2 offset-md3 lg1>
              <v-date-picker v-model="endDate"></v-date-picker>
            </v-flex>
            <v-flex xs12 offset-sm3 md3>
              <v-time-picker v-model="endTime"></v-time-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn 
                class="primary"
                :disabled="!formIsValid"
                type="submit"
              >Create Contest</v-btn>
            </v-flex>
          </v-layout>

        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<<script>
export default {
  data() {
    return {
      title: '',
      participants: [],
      bets: [],
      startDate: new Date(),
      startTime: new Date(),
      endDate: new Date(),
      endTime: new Date(),
      end: new Date(),
    };
  },
  computed: {
    formIsValid() {
      return this.title !== '';
    },
    contestStart() {
      const date = new Date(this.startDate);

      if (typeof this.startTime === 'string') {
        const timeRegex = this.startTime.match(/^(\d+):(\d+)(am|pm)$/);
        const offset = timeRegex[3] === 'pm' ? 12 : 0;
        date.setHours(parseInt(timeRegex[1], 0) + offset);
        date.setMinutes(timeRegex[2]);
      } else {
        date.setHours(this.startTime.getHours());
        date.setMinutes(this.startTime.getMinutes());
      }
      return date;
    },
    contestEnd() {
      const date = new Date(this.endDate);

      if (typeof this.endDate === 'string') {
        const timeRegex = this.endTime.match(/^(\d+):(\d+)(am|pm)$/);
        const offset = timeRegex[3] === 'pm' ? 12 : 0;
        date.setHours(parseInt(timeRegex[1], 0) + offset);
        date.setMinutes(timeRegex[2]);
      } else {
        date.setHours(this.endDate.getHours());
        date.setMinutes(this.endDate.getMinutes());
      }
      return date;
    },
  },
  methods: {
    onCreateContest() {
      if (!this.formIsValid) {
        return;
      }

      const contestData = {
        id: parseInt(Math.random(100) * 100, 10),
        title: this.title,
        start: this.contestStart,
        end: this.contestEnd,
        bets: [],
        participants: [],
      };
      this.$store.dispatch('createContest', contestData);
      this.$router.push('/contests');
    },
  },
};
</script>
