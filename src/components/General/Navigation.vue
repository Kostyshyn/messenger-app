<template>
  <div class="navigation-wrap">
    <div v-if="loggedIn" class="navigation">
      <Drawer :open="true">
        <template slot-scope="{ toggle }">
          <button @click="toggle">Open</button>
        </template>
        <template #sidebar>
          drawer
        </template>
      </Drawer>
      <Button to="/" exact className="link" color="transparent">
        Home
      </Button>
      <Button to="/chats" className="link" color="transparent">
        Chats
      </Button>

      <div class="navigation-right">
        <UserImage
          className="navigation-user-link"
          :to="userUrl"
          :image="userImageUrl"
        />
        <Button className="logout" ripple @click="logout">
          Logout <Icon name="logout" />
        </Button>
      </div>
    </div>
    <div v-else class="navigation">
      <Button className="auth-link" to="/login" ripple>
        Login
      </Button>
      <Button className="auth-link" to="/register" color="primary" ripple>
        Register
      </Button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/General/Button.vue';
import Icon from '@/components/General/Icon.vue';
import UserImage from '@/components/General/UserImage.vue';
import Drawer from '@/components/General/Drawer.vue';
import { mapGetters } from 'vuex';
import api from '@/services/api';

export default {
  name: 'Navigation',
  components: {
    Drawer,
    Button,
    Icon,
    UserImage
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedId',
      user: 'user/user',
      token: 'user/token',
      baseUrl: 'app/baseUrl'
    }),
    userImageUrl() {
      const { baseUrl, user, token } = this;
      return `${baseUrl}/${user.profile_image.url}?token=${token}`;
    },
    userUrl() {
      return { name: 'Chats', params: { url: this.user.url } };
    }
  },
  methods: {
    logout() {
      api.logout();
    }
  }
};
</script>
<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding: 0px 15px;
  box-shadow: $primary-shadow;
  .auth-link {
    margin-right: 10px;
  }
  .navigation-right {
    display: flex;
    margin-left: auto;
    .navigation-user-link {
      margin-right: 10px;
    }
    .logout {
      .icon {
        margin-left: 10px;
      }
    }
  }
}
</style>
