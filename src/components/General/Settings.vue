<template>
  <div class="user-settings">
    <h1>Settings</h1>
    <p>{{ user.username }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Settings',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      token: 'user/token',
      baseUrl: 'app/baseUrl'
    })
  },
  methods: {
    ...mapActions({
      close: 'app/closePopup'
    })
  },
  watch: {},
  mounted() {},
  created() {}
};
</script>
<style lang="scss" scoped>
.user-settings {
  height: 500px;
  padding: 15px;
}
</style>
