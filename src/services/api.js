import axios from "axios";
import ls from "local-storage";

export const Api = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api`
});

// import modules

import * as auth from "./auth";
import * as user from "./user";

const modules = [
  auth,
  user
];

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
    response => (response.data),
    err => {
      const { response } = err;
      if (response && response.status === 401) {
        ls.remove(process.env.VUE_APP_LOCALSTORAGE_KEY + ".token");
        store.dispatch("user/setToken", null);
        store.dispatch("user/setUser", null);
        router.push("/login");
      }
      return Promise.reject(err.response);
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
};

export default methods;
