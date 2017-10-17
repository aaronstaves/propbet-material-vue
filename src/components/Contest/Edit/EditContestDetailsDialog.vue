<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Contest</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-text>

              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                required>
              </v-text-field>

            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat primary @click="onSave">Save</v-btn>
              <v-btn flat primary @click="editDialog = false">Close</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['contest'],
  data() {
    return {
      editDialog: false,
      editedTitle: this.contest.title,
    };
  },
  methods: {
    onSave() {
      if (this.editedTitle.trim() === '') {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch('updateContest', {
        id: this.contest.id,
        title: this.editedTitle,
      });
    },
  },
};
</script>
