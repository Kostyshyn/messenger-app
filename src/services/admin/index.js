import config from '@/config';
const { ADMIN_MODULE } = config.API;

export const getAdminData = async function({ api }) {
  try {
    return await api.get(`${ADMIN_MODULE}`);
  } catch (err) {
    return Promise.reject(err.data);
  }
};
