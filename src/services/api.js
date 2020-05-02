import axios from 'axios';
import ls from 'local-storage';

export const Api = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api`
});

// import modules

import * as auth from './auth';
import * as user from './user';

const modules = [auth, user];

const methods = {};

export const initServices = function({ router, store }) {
  modules.map(module => {
    for (const method in module) {
      if (module[method]) {
        methods[method] = inject(module[method]);
      }
    }
  });

  Api.interceptors.response.use(
    response => response.data,
    err => {
      const { response, message } = err;
      if (!response && message === 'Network Error') {
        stop();
        return Promise.reject({
          data: 'Network Error'
        });
      }

      if (response && response.status === 401) {
        stop();
      }
      return Promise.reject(response ? response : false);
    }
  );

  function inject(fn) {
    return fn.bind(null, {
      api: Api,
      router,
      store,
      ls
    });
  }

  function stop() {
    const redirectFrom = window.location.pathname;
    ls.remove(process.env.VUE_APP_LOCALSTORAGE_KEY + '.token');
    store.dispatch('user/setToken', null);
    store.dispatch('user/setUser', null);
    store.dispatch('app/closePopup');
    if (!redirectFrom || redirectFrom !== '/login') {
      router.push('/login');
    }
  }
};

export default methods;
