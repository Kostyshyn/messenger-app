export const fetchUser = async function({ api, store }) {
  try {
    const res = await api.get('/user');
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const getContacts = function({ api }, { page, limit, keyword }) {
  return api.get('/user/contacts', {
    params: {
      page,
      limit,
      keyword
    }
  });
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
    const res = await api.post('/user/image', payload, {
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

export const getUserImages = async function({ api }, id) {
  try {
    return api.get(`/users/${id}/images`);
  } catch (err) {
    return Promise.reject(err.data);
  }
};
