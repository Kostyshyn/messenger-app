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
