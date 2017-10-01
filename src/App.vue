<template>
  <v-app>
    <!-- nav drawer -->
    <v-navigation-drawer
      light
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
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- nav toolbar -->
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-toolbar-title>Propbet App</v-toolbar-title>
        </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in menuItems"
          :key="item.title"
          flat
          :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
      };
    },
    computed: {
      menuItems() {
        if (this.userIsAuthenticated) {
          return [
            { title: 'View Contests', icon: 'group', link: '/contests' },
            { title: 'Create Contest', icon: 'group_add', link: '/contest/create' },
            { title: 'Profile', icon: 'person', link: '/profile' },
          ];
        }
        return [
          { title: 'Sign up', icon: 'face', link: '/signup' },
          { title: 'Sign in', icon: 'lock_open', link: '/signin' },
        ];
      },
      userIsAuthenticated() {
        return (this.$store.getters.user !== null && this.$store.getters.user !== undefined);
      },
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout');
      },
    },
  };
</script>
