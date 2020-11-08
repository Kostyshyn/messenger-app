<template>
  <div class="main-wrapper">
    <div class="main-page">
      <h1>Admin page</h1>
      <p>Device: {{ device }}</p>
      <p>User name: {{ user.username }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AdminPanel',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      device: 'app/device'
    })
  },
  methods: {
    ...mapActions({})
  },
  created() {}
};
</script>
<style scoped lang="scss"></style>
