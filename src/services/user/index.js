export const fetchUser = async function({ api, store }) {
  try {
    const res = await api.get('/user');
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const getContacts = async function({ api }, { page, limit, keyword }) {
  try {
    return await api.get('/user/contacts', {
      params: {
        page,
        limit,
        keyword
      }
    });
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
    const res = await api.get(`/users/${id}/images`);
    return res.images;
  } catch (err) {
    return Promise.reject(err.data);
  }
};
