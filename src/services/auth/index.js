export const login = async function(
  { api, store, router, ls },
  payload,
  redirect = false
) {
  try {
    const res = await api.post('/login', payload);
    ls.set(process.env.VUE_APP_LOCALSTORAGE_KEY + '.token', res.token);
    store.dispatch('user/setToken', res.token);
    store.dispatch('user/setUser', res.user);
    if (redirect) {
      router.push(redirect);
    } else {
      router.push('/');
    }
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const register = async function({ api, store, router, ls }, payload) {
  try {
    const res = await api.post('/register', payload);
    ls.set(process.env.VUE_APP_LOCALSTORAGE_KEY + '.token', res.token);
    store.dispatch('user/setToken', res.token);
    store.dispatch('user/setUser', res.user);
    router.push('/');
    return res.user;
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
