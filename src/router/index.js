import Vue from 'vue';
import Router from 'vue-router';
import CreateContest from '@/components/Contest/CreateContest';
import Contests from '@/components/Contest/Contests';
import Profile from '@/components/User/Profile';
import Home from '@/components/Home';
import Signin from '@/components/User/Signin';
import Signup from '@/components/User/Signup';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/contest/create',
      name: 'CreateContest',
      component: CreateContest,
    },
    {
      path: '/contests',
      name: 'Contests',
      component: Contests,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/signin',
      name: 'Siginin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
  ],
});
