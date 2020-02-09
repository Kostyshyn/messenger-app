<template>
  <div class="navigation">
    <div v-if="loggedIn">
      <router-link to="/">Home</router-link>
      <router-link to="/chats">Chats</router-link>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
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
      loggedIn: 'user/loggedId'
    })
  },
  methods: {
    logout() {
      api.logout();
    }
  }
};
</script>
