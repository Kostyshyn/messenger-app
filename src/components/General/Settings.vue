<template>
  <div class="user-settings">
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
    return {
      // popup title
      title: 'Settings'
    };
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
    }),
    // popup 'back' button action
    backAction() {
      console.log('back action');
    }
  },
  watch: {},
  mounted() {},
  created() {}
};
</script>
<style lang="scss" scoped>
.user-settings {
  height: 400px;
  padding: 15px;
}
</style>
