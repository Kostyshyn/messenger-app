export const fetchUser = async function({ api, store }) {
  try {
    const res = await api.get('/user');
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};
