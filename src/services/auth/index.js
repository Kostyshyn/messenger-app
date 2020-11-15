import config from '@/config';
const { AUTH_MODULE } = config.API;

export const login = async function({ api, store, ls }, payload) {
  try {
    const res = await api.post(`${AUTH_MODULE}/login`, payload);
    ls.set(process.env.VUE_APP_LOCALSTORAGE_KEY + '.token', res.token);
    store.dispatch('user/setToken', res.token);
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const register = async function({ api, store, ls }, payload) {
  try {
    const res = await api.post(`${AUTH_MODULE}/register`, payload);
    ls.set(process.env.VUE_APP_LOCALSTORAGE_KEY + '.token', res.token);
    store.dispatch('user/setToken', res.token);
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const confirm = async function({ api, store, ls }, token) {
  try {
    const res = await api.get(`${AUTH_MODULE}/confirm`, {
      params: { token }
    });
    ls.set(process.env.VUE_APP_LOCALSTORAGE_KEY + '.token', res.token);
    store.dispatch('user/setToken', res.token);
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const resendConfirm = async function({ api }) {
  try {
    return await api.get(`${AUTH_MODULE}/resend-confirm`);
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const resetPassword = async function({ api }, payload) {
  try {
    return await api.post(`${AUTH_MODULE}/reset-password`, payload);
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const changePassword = async function({ api, store, ls }, payload) {
  try {
    const res = await api.post(`${AUTH_MODULE}/change-password`, payload);
    ls.set(process.env.VUE_APP_LOCALSTORAGE_KEY + '.token', res.token);
    store.dispatch('user/setToken', res.token);
    store.dispatch('user/setUser', res.user);
    return res;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const logout = function({ store, router, ls }) {
  ls.remove(process.env.VUE_APP_LOCALSTORAGE_KEY + '.token');
  store.dispatch('user/setToken', null);
  store.dispatch('user/setUser', null);
  router.push('/login');
};
