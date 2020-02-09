export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    setUser({ commit }, user) {
      commit('SET_USER', user);
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  getters: {
    loggedId: state => !!(state.token && state.user),
    user: state => state.user
  }
};
