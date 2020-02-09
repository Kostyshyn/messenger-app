import Vue from 'vue';
import VueRouter from 'vue-router';
import { globalGuard, authGuard } from './guards.js';
import Home from '../views/Home.vue';
import ErrorPage from '../views/ErrorPage.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
