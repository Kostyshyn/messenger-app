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
          <IconList :list="menuList" @action="action" />
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
      adminMenuItems: [
        {
          label: 'Admin panel',
          icon: 'dashboard',
          action: 'openAdminPanel'
        }
      ],
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
      settings: 'app/settings',
      user: 'user/user',
      open: 'app/sidebarOpen',
      device: 'app/device'
    }),
    menuList() {
      const { user, settings, adminMenuItems, menuItems } = this;
      if (user.role === settings.PRIVATE_ACCESS_ADMIN) {
        return [...adminMenuItems, ...menuItems];
      }
      return menuItems;
    },
    width() {
      return this.device === 'sm' ? 280 : 250;
    }
  },
  methods: {
    ...mapActions({
      toggle: 'app/setSidebarState',
      openPopup: 'popup/openPopup'
    }),
    action(method) {
      if (method && this[method]) {
        this[method]();
      }
    },
    openAdminPanel() {
      this.$router.push('/admin-panel');
    },
    openContacts() {
      this.openPopup('contacts');
    },
    openSettings() {
      this.openPopup('settings');
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
