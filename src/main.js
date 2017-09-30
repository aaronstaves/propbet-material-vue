import Vue from 'vue';
import Vuetify from 'vuetify';
import * as firebase from 'firebase';
import './stylus/main.styl';
import App from './App';
import router from './router';
import { store } from './store';
import DateFilter from './filters/date';
import AlertCmp from './components/Shared/Alert';

Vue.use(Vuetify);
Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDmvWRAxRP4SqHyZDsE_6qcK4ArfytCdC4',
      authDomain: 'material-propbet.firebaseapp.com',
      databaseURL: 'https://material-propbet.firebaseio.com',
      projectId: 'material-propbet',
      storageBucket: 'material-propbet.appspot.com',
      messagingSenderId: '678935634403',
    });
  },
});
