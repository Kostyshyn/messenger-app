import config from '@/config';
const { ADMIN_MODULE } = config.API;

export const getAdminData = async function({ api }) {
  try {
    return await api.get(`${ADMIN_MODULE}`);
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const getUsersData = async function({ api }, params) {
  try {
    return await api.get(`${ADMIN_MODULE}/users`, {
      params: {
        ...params
      }
    });
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const getOriginsData = async function({ api }, params) {
  try {
    return await api.get(`${ADMIN_MODULE}/origins`, {
      params: {
        ...params
      }
    });
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const createOrigin = async function({ api }, payload) {
  try {
    const res = await api.post(`${ADMIN_MODULE}/origins`, payload);
    return res.origin;
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const deleteOrigin = async function({ api }, id) {
  try {
    return await api.delete(`${ADMIN_MODULE}/origins/${id}`);
  } catch (err) {
    return Promise.reject(err.data);
  }
};
