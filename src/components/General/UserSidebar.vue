<template>
  <Drawer :open="open" :width="width" @toggle="toggle">
    <template slot-scope="{ toggle }">
      <div class="toggle-btn" @click="toggle">
        <Icon img name="menu_lg" />
      </div>
    </template>
    <template #sidebar>
      <div class="user-sidebar">
        <UserLabel :user="user" className="sidebar-user-label" big />
        <div class="sidebar-body">
          <List>
            <ModeListItem
              v-model="notifications"
              label="Notifications"
              iconOn="notifications"
              iconOff="notifications_off"
            />
          </List>
          <IconList :list="menuItems" @action="action" />
        </div>
      </div>
    </template>
  </Drawer>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/General/Helpers/Icon.vue';
import Drawer from '@/components/General/Helpers/Drawer.vue';
import UserLabel from '@/components/General/User/UserLabel.vue';
import List from '@/components/General/List/List.vue';
import IconList from '@/components/General/List/IconList.vue';
import ModeListItem from '@/components/General/List/ModeListItem.vue';
import ContactList from '@/components/Popups/Contacts/ContactList.vue';
import Settings from '@/components/Popups/Settings/Settings.vue';
import { mapGetters, mapActions } from 'vuex';
import api from '@/services/api';

export default {
  name: 'UserSidebar',
  components: {
    Icon,
    Drawer,
    UserLabel,
    ModeListItem,
    List,
    IconList
  },
  data() {
    return {
      menuItems: [
        {
          label: 'Contacts',
          icon: 'person',
          action: 'openContacts'
        },
        {
          label: 'Create group',
          icon: 'people',
          action: ''
        },
        {
          label: 'Settings',
          icon: 'settings',
          action: 'openSettings'
        },
        {
          label: 'Log out',
          icon: 'arrow_back',
          action: 'logout'
        }
      ],
      notifications: true
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      open: 'app/sidebarOpen',
      device: 'app/device'
    }),
    width() {
      return this.device === 'sm' ? 280 : 250;
    }
  },
  methods: {
    ...mapActions({
      toggle: 'app/setSidebarState',
      openPopup: 'app/openPopup'
    }),
    action(method) {
      if (method && this[method]) {
        this[method]();
      }
    },
    openContacts() {
      this.toggle(false);
      this.openPopup({
        name: 'contacts',
        component: ContactList,
        options: {
          close: false
        },
        data: {
          contacts: [1, 2, 3]
        }
      });
    },
    openSettings() {
      this.toggle(false);
      this.openPopup({
        name: 'settings',
        component: Settings,
        options: {
          backdrop: false
        },
        data: {}
      });
    },
    logout() {
      this.toggle(false);
      api.logout();
    }
  }
};
</script>
<style lang="scss" scoped>
.user-sidebar {
  /deep/ .sidebar-user-label {
    background-color: $light-grey-color;
  }
  .sidebar-body {
    margin-top: 15px;
  }
}
.toggle-btn {
  cursor: pointer;
  display: inline-block;
  width: 36px;
  height: 36px;
  position: relative;
  border-radius: 4px;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    /deep/ svg {
      fill: $primary-color;
    }
  }
  @include ripple;
}
</style>
