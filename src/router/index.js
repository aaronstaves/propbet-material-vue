import Vue from 'vue';
import Router from 'vue-router';
import CreateContest from '@/components/Contest/Create';
import Contests from '@/components/Contest/Contests';
import Contest from '@/components/Contest/Contest';
import Profile from '@/components/User/Profile';
import Home from '@/components/Home';
import Signin from '@/components/User/Signin';
import Signup from '@/components/User/Signup';
import AuthGuard from '@/router/auth-guard';

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
      beforeEnter: AuthGuard,
    },
    {
      path: '/contests',
      name: 'Contests',
      component: Contests,
    },
    {
      path: '/contests/:id',
      name: 'Contest',
      props: true,
      component: Contest,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard,
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
