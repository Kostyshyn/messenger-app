import config from '@/config';
const { USERS_MODULE } = config.API;

export const fetchUser = async function({ api, store }) {
  try {
    const res = await api.get(`${USERS_MODULE}/self`);
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const updateUser = async function({ api, store }, payload) {
  try {
    const { _id: id } = store.getters['user/user'];
    const res = await api.put(`${USERS_MODULE}/${id}`, payload);
    store.dispatch('user/setUser', res.user);
    return res.user;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const uploadUserImage = async function({ api, store }, payload) {
  try {
    const { _id: id } = store.getters['user/user'];
    const res = await api.post(`${USERS_MODULE}/${id}/images`, payload, {
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
    return api.get(`${USERS_MODULE}/${id}/images`);
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const getContacts = function({ api, store }, { page, limit, keyword }) {
  const { _id: id } = store.getters['user/user'];
  return api.get(`${USERS_MODULE}/${id}/contacts`, {
    params: {
      page,
      limit,
      keyword
    }
  });
};
