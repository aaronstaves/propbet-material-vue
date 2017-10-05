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
      const { year, month, day } = this.$_contestCreate_parseDate(this.startDate);
      const { hours, minutes } = this.$_contestCreate_parseTime(this.startTime);

      return new Date(year, month, day, hours, minutes);
    },
    contestEnd() {
      const { year, month, day } = this.$_contestCreate_parseDate(this.endDate);
      const { hours, minutes } = this.$_contestCreate_parseTime(this.endTime);

      return new Date(year, month, day, hours, minutes);
    },
  },
  methods: {
    $_contestCreate_parseDate(date) {
      if (typeof date === 'object') {
        return {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
        };
      }
      const dateRegex = date.match(/^(\d+)-(\d+)-(\d+)$/);
      return {
        year: (parseInt(dateRegex[1], 0)),
        month: (parseInt(dateRegex[2], 0) - 1),
        day: (parseInt(dateRegex[3], 0)),
      };
    },
    $_contestCreate_parseTime(time) {
      if (typeof time === 'object') {
        return {
          hours: time.getHours(),
          minutes: time.getMinutes(),
        };
      }
      const timeRegex = time.match(/^(\d+):(\d+)(am|pm)$/);
      const ampm = timeRegex[3];
      const minutes = parseInt(timeRegex[2], 0);
      let hours = parseInt(timeRegex[1], 0);

      if (ampm === 'am' && hours === 12) {
        hours = 0;
      } else if (ampm === 'pm' && hours === 12) {
        hours = 12;
      } else if (ampm === 'pm') {
        hours += 12;
      }


      return {
        hours,
        minutes,
      };
    },
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
