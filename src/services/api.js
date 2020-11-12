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

const STOP_ON_STATUS = [401, 404];

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

      if (response && STOP_ON_STATUS.includes(response.status)) {
        // TODO: handle errors with status code 500
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
    store.dispatch('popup/closePopup');
    if (!redirectFrom || redirectFrom !== '/login') {
      router.push('/login');
    }
  }
};

export default methods;
