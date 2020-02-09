import { Api } from '@/services/api';

export default store => {
  store.subscribe(({ type, payload }) => {
    if (type === 'user/SET_TOKEN') {
      Api.defaults.headers.common['x-access-token'] = payload;
    }
  });
};
