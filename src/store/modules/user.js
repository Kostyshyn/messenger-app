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
    loggedIn: state => !!(state.token && state.user),
    user: state => state.user,
    token: state => state.token,
    isAdmin: ({ user }, getters, rootState, rootGetters) => {
      const settings = rootGetters['app/settings'];
      return user && user.role === settings.PRIVATE_ACCESS_ADMIN;
    }
  }
};
