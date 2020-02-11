export const fetchUser = async function({ api, store }) {
  try {
    const res = await api.get('/user');
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const getUsers = async function({ api }, { page, limit }) {
  try {
    const res = await api.get('/users', {
      params: {
        page,
        limit
      }
    });
    return res;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const getUserByUrl = async function({ api }, url) {
  try {
    const res = await api.get(`/users/${url}`);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};
