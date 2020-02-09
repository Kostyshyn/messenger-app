import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { initServices } from './services/api';

import './assets/styles/style.scss';

initServices({
  router,
  store
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
