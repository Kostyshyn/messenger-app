import Vue from 'vue';
import Vuex from 'vuex';
import axios from './plugins/axios';
import app from './modules/app';
import user from './modules/user';
import popup from './modules/popup';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    popup
  },
  plugins: [axios]
});
