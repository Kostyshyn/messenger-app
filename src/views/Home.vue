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

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      users: []
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
    env() {
      return process.env.NODE_ENV;
    }
  },
  methods: {},
  created() {}
};
</script>
