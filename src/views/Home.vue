<template>
  <div class="home">
    <h1>Home<span v-if="user">: {{ user.username }}</span></h1>
    <p>Environment: {{ env }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/services/api";

export default {
  name: "Home",
  components: {},
  computed: {
    env() {
      return process.env.NODE_ENV;
    },
    user() {
      return this.$store.state.user.user;
    }
  },
  methods: {
    logout() {
      api.logout();
    }
  }
};
</script>
