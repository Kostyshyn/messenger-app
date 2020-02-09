<template>
  <div class="home">
    <h1>
      Home
      <span v-if="user">: {{ user.username }}</span>
    </h1>
    <p>Environment: {{ env }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import api from '@/services/api';

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
    env() {
      return process.env.NODE_ENV;
    }
  },
  methods: {
    logout() {
      api.logout();
    }
  }
};
</script>
