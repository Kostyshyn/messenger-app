<template>
  <div class="main-wrapper">
    <div class="main-page">
      <h1>Admin page</h1>
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
      settings: 'app/settings',
      user: 'user/user',
      device: 'app/device',
      loggedIn: 'user/loggedId'
    })
  },
  methods: {
    ...mapActions({}),
    checkAdmin() {
      const { user, settings } = this;
      if (user.role !== settings.PRIVATE_ACCESS_ADMIN) {
        this.$router.push('/');
      }
    }
  },
  created() {
    console.log('Created: Admin panel', this.user);
    // this.checkAdmin();
  },
  beforeRouteEnter(from, to, next) {
    console.log('beforeRouteEnter', 'AdminPanel');
    next();
  }
};
</script>
<style scoped lang="scss"></style>
