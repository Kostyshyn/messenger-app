import Vue from 'vue';
import VueRouter from 'vue-router';
import { globalGuard, authGuard, confirmGuard } from './guards.js';
import Main from '@/views/Main.vue';
import ErrorPage from '@/views/ErrorPage.vue';

// Auth views
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Confirm from '@/views/Confirm.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: authGuard,
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    beforeEnter: authGuard,
    component: Register
  },
  {
    path: '/confirm',
    name: 'Confirm',
    beforeEnter: confirmGuard,
    component: Confirm
  },
  {
    path: '*',
    name: 'Error',
    component: ErrorPage
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(globalGuard);

export default router;
