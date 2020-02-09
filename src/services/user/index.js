export const fetchUser = async function({ api, store }) {
  try {
    const res = await api.get('/user');
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const getUsers = async function({ api }) {
  try {
    const res = await api.get('/users');
    return res.users;
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
