import ls from 'local-storage';
import api from '@/services/api';

export default {
  namespaced: true,
  state: {
    API_BASE_URL: null,
    loading: true
  },
  actions: {
    init({ commit, dispatch }) {
      commit('SET_API_BASE_URL', process.env.VUE_APP_API_BASE_URL);
      const token = ls.get(process.env.VUE_APP_LOCALSTORAGE_KEY + '.token');
      if (token) {
        dispatch('user/setToken', token, {
          root: true
        });
        // prettier-ignore
        api.fetchUser().catch(err => {
          alert(err.message); // development
        }).finally(() => {
          commit('SET_LOADING', false);
        });
      } else {
        commit('SET_LOADING', false);
      }
    }
  },
  mutations: {
    SET_API_BASE_URL(state, url) {
      state.API_BASE_URL = url;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    }
  },
  getters: {
    loading: state => state.loading,
    baseUrl: state => state.API_BASE_URL
  }
};
