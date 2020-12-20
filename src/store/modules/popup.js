// users sidebar
import ContactList from '@/components/Popups/Contacts/ContactList.vue';
import Settings from '@/components/Popups/Settings/Settings.vue';
// admin area
import OriginPopup from '@/components/General/Admin/Panels/Origins/OriginPopup.vue';

// Default options

// {
//   close: true
//   backdrop: true
//   keepOpen: true
// }

const USERS_POPUPS = {
  contacts: {
    name: 'contacts',
    component: ContactList,
    requiresAuth: true,
    options: {
      close: false
    }
  },
  settings: {
    name: 'settings',
    component: Settings,
    requiresAuth: true,
    options: {
      backdrop: false
    }
  }
};

const ADMIN_POPUPS = {
  origin: {
    name: 'origin',
    component: OriginPopup,
    requiresAuth: true,
    options: {
      keepOpen: false
    }
  }
};

export default {
  namespaced: true,
  state: {
    popup: {
      open: false,
      name: '',
      component: null,
      requiresAuth: false,
      options: {},
      data: {},
      callback: null
    },
    popups: {
      ...USERS_POPUPS,
      ...ADMIN_POPUPS
    }
  },
  actions: {
    openPopup(
      { state, commit, dispatch },
      { type, data = {}, callback = () => {} }
    ) {
      const popup = state.popups[type];
      if (popup && popup.component) {
        dispatch('app/setSidebarState', false, {
          root: true
        });
        commit('SET_POPUP', {
          ...popup,
          open: true,
          data,
          callback
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
        requiresAuth: false,
        options: {},
        data: {},
        callback: null
      };
    }
  },
  getters: {
    popup: state => state.popup,
    popups: state => state.popups
  }
};
