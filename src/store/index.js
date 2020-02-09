import Vue from 'vue';
import Vuex from 'vuex';
import axios from './plugins/axios';
import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  plugins: [axios]
});
