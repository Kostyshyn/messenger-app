<template>
  <Drawer :open="open" :width="width" @toggle="toggle">
    <template slot-scope="{ toggle }">
      <div class="toggle-btn" @click="toggle">
        <Icon img name="menu_lg" />
      </div>
    </template>
    <template #sidebar>
      <div class="admin-sidebar-header">
        Admin panel
      </div>
      <div class="admin-sidebar">
        <div class="sidebar-body">
          <IconList :list="adminMenuItems" @action="action" />
        </div>
      </div>
    </template>
  </Drawer>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/General/Helpers/Icon.vue';
import Drawer from '@/components/General/Helpers/Drawer.vue';
import IconList from '@/components/General/List/IconList.vue';
import { mapGetters, mapActions } from 'vuex';
import api from '@/services/api';

export default {
  name: 'AdminSidebar',
  components: {
    Icon,
    Drawer,
    IconList
  },
  data() {
    return {
      adminMenuItems: [
        {
          label: 'Application',
          link: '/',
          icon: 'exit_to_app'
        },
        {
          label: 'Dashboard',
          link: '/admin-panel/dashboard',
          icon: 'assessment'
        },
        {
          label: 'Users',
          link: '/admin-panel/users',
          icon: 'person'
        },
        {
          label: 'API origins',
          link: '/admin-panel/origins',
          icon: 'planet'
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
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isAdmin: 'user/isAdmin',
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
      openPopup: 'popup/openPopup'
    }),
    action(method) {
      if (method && this[method]) {
        this[method]();
      }
    },
    openApplication() {
      this.$router.push('/');
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
.admin-sidebar-header {
  padding: 15px;
  background-color: $primary-color;
  font-size: 20px;
  color: $white-font-color;
  margin: 0 0 3px 0;
  line-height: 20px;
}
.admin-sidebar {
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
      fill: $white-background-color;
    }
  }
  @include ripple;
}
</style>
