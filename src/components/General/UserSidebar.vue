<template>
  <Drawer :open="open" :width="width" @toggle="toggle">
    <template slot-scope="{ toggle }">
      <div class="toggle-btn" @click="toggle">
        <Icon img name="menu_lg" />
      </div>
    </template>
    <template #sidebar>
      <div class="user-sidebar">
        <div class="sidebar-header">
          <img :src="userImage" :alt="user.username" class="sidebar-user-img" />
          <div class="user-info">
            <h3 class="username">{{ user.username }}</h3>
            <p class="url">{{ user.url }}</p>
          </div>
        </div>
        <div class="sidebar-body">
          <!-- develpment -->
          <div class="mode-item" @click="notifications = !notifications">
            <div class="mode-icon">
              <Icon v-show="notifications" name="notifications" />
              <Icon v-show="!notifications" name="notifications_off" />
            </div>
            <div class="mode-label">
              Notifications
            </div>
            <Check class="mute-check" :value="notifications" />
          </div>
          <IconList :list="menuItems" @action="action" />
        </div>
      </div>
    </template>
  </Drawer>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/Helpers/Icon.vue';
import Drawer from '@/components/Helpers/Drawer.vue';
import Check from '@/components/General/Form/Check.vue';
import IconList from '@/components/General/IconList.vue';
import ContactList from '@/components/General/ContactList.vue';
import Settings from '@/components/General/Settings.vue';
import { mapGetters, mapActions } from 'vuex';
import api from '@/services/api';

export default {
  name: 'UserSidebar',
  components: {
    Icon,
    Drawer,
    Check,
    IconList
  },
  data() {
    return {
      width: 250,
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
      token: 'user/token',
      baseUrl: 'app/baseUrl',
      open: 'app/sidebarOpen'
    }),
    userImage() {
      const { baseUrl, user, token } = this;
      return `${baseUrl}/${user.profile_image.url}?token=${token}`;
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
        options: {},
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
  .sidebar-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid $grey-color;
    padding: 15px;
    .sidebar-user-img {
      display: inline-block;
      width: 48px;
      height: 48px;
      -o-object-fit: cover;
      object-fit: cover;
      border-radius: 50%;
    }
    .user-info {
      margin-left: 10px;
      width: calc(100% - 48px);
      .username {
        height: 20px;
        color: $primary-color;
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 3px 0;
        @include trancate-text;
      }
      .url {
        height: 16px;
        color: $dark-grey-color;
        font-size: 14px;
        @include trancate-text;
      }
    }
  }
  .sidebar-body {
    .mode-item {
      display: flex;
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        background-color: $light-grey-color;
      }
      .mode-icon {
        display: flex;
        font-size: 20px;
        height: 36px;
        width: 30px;
        align-items: center;
        justify-content: center;
        /deep/ svg {
          fill: $dark-grey-color;
        }
      }
      .mode-label {
        user-select: none;
        font-size: 16px;
        line-height: 36px;
        padding: 0px 10px;
        font-weight: 600;
        color: $black-font-color;
      }
      .mute-check {
        margin-left: auto;
      }
    }
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
