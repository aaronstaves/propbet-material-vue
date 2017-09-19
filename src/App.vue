<template>
  <v-app>
    <!-- nav drawer -->
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      overflow
      absolute
    >
     <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- nav toolbar -->
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Propbet App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat><v-icon left>group</v-icon>View Contests</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        items: [
          { title: 'View Contests', icon: 'group' },
        ],
      };
    },
  };
</script>
