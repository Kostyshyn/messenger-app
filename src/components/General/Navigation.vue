<template>
  <div class="navigation-wrap">
    <div v-if="loggedIn" class="navigation">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/chats">Chats</router-link>

      <div class="navigation-right">
        <span class="user">{{ user.username }}</span>
        <button @click="logout" class="logout">Logout</button>
      </div>
    </div>
    <div v-else class="navigation">
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import api from '@/services/api';

export default {
  name: 'Navigation',
  components: {},
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedId',
      user: 'user/user'
    })
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
  height: 60px;
  padding: 0px 15px;
  border-bottom: 1px solid rgb(193, 193, 193);
  a {
    display: inline-block;
    padding: 0px 5px;
    font-size: 16px;
    font-weight: 600;
    color: $primary-font-color;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &.router-link-active {
      text-decoration: underline;
    }
  }
  .navigation-right {
    display: inline-block;
    margin-left: auto;
    .user {
      display: inline-block;
      font-weight: 600;
      padding: 0px 15px;
    }
  }
}
</style>
