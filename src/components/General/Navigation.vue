<template>
  <div class="navigation">
    <div v-if="loggedIn">
      <router-link v-if="loggedIn" to="/">Home</router-link>
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
import api from "@/services/api";

export default {
  name: "Navigation",
  components: {},
  computed: {
    loggedIn() {
      return this.$store.getters["user/loggedId"];
    }
  },
  methods: {
    logout() {
      api.logout();
    }
  }
};
</script>
