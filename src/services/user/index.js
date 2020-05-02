export const fetchUser = async function({ api, store }) {
  try {
    const res = await api.get('/user');
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const getUsers = async function({ api }, { page, limit, keyword }) {
  try {
    const res = await api.get('/users', {
      params: {
        page,
        limit,
        keyword
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

export const updateUser = async function({ api, store }, payload) {
  try {
    const res = await api.put('/user/info', payload);
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const uploadUserImage = async function({ api, store }, payload) {
  try {
    const res = await api.post('/upload/user/image', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};
