import ls from 'local-storage';
import api from '@/services/api';

export default {
  namespaced: true,
  state: {
    API_BASE_URL: null,
    settings: {
      // TODO: get the global settings from the backend
      DEF_PROFILE_IMG: 'defaults/images/user/128_profile_placeholder.png'
    },
    loading: true,
    sidebarOpen: false,
    breakpoints: {
      sm: 576,
      md: 768,
      lg: 992
    },
    device: null,
    popup: {
      open: false,
      name: '',
      component: null,
      options: {},
      data: {}
    },
    carousel: {
      open: false,
      id: null,
      actions: false
    }
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
    },
    setSidebarState({ commit }, sidebar) {
      commit('SET_SIDEBAR_STATE', sidebar);
    },
    resize({ state, commit }, width) {
      const { breakpoints } = state;
      for (const b in breakpoints) {
        if (width < breakpoints[b]) {
          commit('SET_DEVICE', b);
          break;
        }
      }
    },
    openPopup({ commit }, popup) {
      if (popup && popup.component) {
        commit('SET_POPUP', {
          ...popup,
          open: true
        });
      }
    },
    closePopup({ commit }) {
      commit('RESET_POPUP');
    },
    openCarousel({ commit }, carousel) {
      if (carousel) {
        commit('SET_CAROUSEL', {
          ...carousel,
          open: true
        });
      }
    },
    closeCarousel({ commit }) {
      commit('RESET_CAROUSEL');
    }
  },
  mutations: {
    SET_API_BASE_URL(state, url) {
      state.API_BASE_URL = url;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_SIDEBAR_STATE(state, sidebar) {
      state.sidebarOpen = sidebar;
    },
    SET_DEVICE(state, device) {
      state.device = device;
    },
    SET_POPUP(state, popup) {
      state.popup = popup;
    },
    RESET_POPUP(state) {
      state.popup = {
        open: false,
        name: '',
        component: null,
        options: {},
        data: {}
      };
    },
    SET_CAROUSEL(state, carousel) {
      state.carousel = carousel;
    },
    RESET_CAROUSEL(state) {
      state.carousel = {
        open: false,
        id: null,
        actions: false
      };
    }
  },
  getters: {
    settings: state => state.settings,
    loading: state => state.loading,
    baseUrl: state => state.API_BASE_URL,
    sidebarOpen: state => state.sidebarOpen,
    device: state => state.device,
    popup: state => state.popup,
    carousel: state => state.carousel
  }
};
