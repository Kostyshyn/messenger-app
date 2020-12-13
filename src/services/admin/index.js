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

// Origins

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

export const updateOrigin = async function({ api }, { payload, id }) {
  try {
    const res = await api.put(`${ADMIN_MODULE}/origins/${id}`, payload);
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

// Requests

export const getRequestsData = async function({ api }, params) {
  try {
    return await api.get(`${ADMIN_MODULE}/requests`, {
      params: {
        ...params
      }
    });
  } catch (err) {
    return Promise.reject(err.data);
  }
};

export const getRequest = async function({ api }, id) {
  try {
    return await api.get(`${ADMIN_MODULE}/requests/${id}`);
  } catch (err) {
    return Promise.reject(err.data);
  }
};
