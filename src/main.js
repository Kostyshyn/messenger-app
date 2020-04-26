import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { initServices } from './services/api';

// external

import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css';
Vue.use(VueCroppie);

//

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
