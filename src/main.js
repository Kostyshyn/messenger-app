import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { initServices } from './services/api';
import bindDirectives from '@/directives';

// external

// Cropper
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css';
Vue.use(VueCroppie);
//

// Moment js
import VueMoment from 'vue-moment';
Vue.use(VueMoment);
//

// Lodash
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
Vue.use(VueLodash, { lodash });
//

initServices({
  router,
  store
});

bindDirectives(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
