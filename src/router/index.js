import Vue from 'vue';
import VueRouter from 'vue-router';
import { globalGuard, authGuard, tokenGuard } from './guards.js';
import Main from '@/views/Main.vue';
import ErrorPage from '@/views/ErrorPage.vue';

// test
import Test from '@/views/Test.vue';
//

// Auth views
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import Confirm from '@/views/auth/Confirm.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';
import ChangePassword from '@/views/auth/ChangePassword.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { requiresAuth: true }
  },
  // test
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  //
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
    beforeEnter: tokenGuard,
    component: Confirm
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    beforeEnter: tokenGuard,
    component: ChangePassword
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
