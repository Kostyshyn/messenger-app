import ContactList from '@/components/Popups/Contacts/ContactList';
import Settings from '@/components/Popups/Settings/Settings';

export default {
  namespaced: true,
  state: {
    popup: {
      open: false,
      name: '',
      component: null,
      options: {},
      data: {}
    },
    popups: {
      contacts: {
        name: 'contacts',
        component: ContactList,
        options: {
          close: false
        }
      },
      settings: {
        name: 'settings',
        component: Settings,
        options: {
          backdrop: false
        }
      }
    }
  },
  actions: {
    openPopup({ state, commit, dispatch }, type) {
      const popup = state.popups[type];
      if (popup && popup.component) {
        dispatch('app/setSidebarState', false, {
          root: true
        });
        commit('SET_POPUP', {
          ...popup,
          open: true
        });
      }
    },
    closePopup({ commit }) {
      commit('RESET_POPUP');
    }
  },
  mutations: {
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
    }
  },
  getters: {
    popup: state => state.popup,
    popups: state => state.popups
  }
};
