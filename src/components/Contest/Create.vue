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

<script>
import moment from 'moment';

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
      let dateStr = this.startDate;
      let timeStr = this.startTime;

      // date object, get string
      if (typeof dateStr === 'object') {
        dateStr = `${this.startDate.getFullYear()}-${this.startDate.getMonth() + 1}-${this.startDate.getDate()}`;
      }
      if (typeof timeStr === 'object') {
        timeStr = `${this.startTime.getHours()}:${this.startTime.getMinutes()} ${this.startTime.getHours >= 12 ? 'pm' : 'am'}`;
      }
      return moment(`${dateStr} ${timeStr}`, 'YYYY-MM-DD hh:mm a');
    },
    contestEnd() {
      let dateStr = this.endDate;
      let timeStr = this.endTime;

      // date object, get string
      if (typeof dateStr === 'object') {
        dateStr = `${this.endDate.getFullYear()}-${this.endDate.getMonth() + 1}-${this.endDate.getDate()}`;
      }
      if (typeof timeStr === 'object') {
        timeStr = `${this.endTime.getHours()}:${this.endTime.getMinutes()} ${this.endTime.getHours >= 12 ? 'pm' : 'am'}`;
      }
      return moment(`${dateStr} ${timeStr}`, 'YYYY-MM-DD hh:mm a');
    },
  },
  methods: {
    onCreateContest() {
      if (!this.formIsValid) {
        return;
      }

      const contestData = {
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
