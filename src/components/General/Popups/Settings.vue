<template>
  <div class="user-settings">
    <UserLabel :user="user" className="settings-user-label" big />
  </div>
</template>

<script>
// @ is an alias to /src
import UserLabel from '@/components/General/User/UserLabel.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Settings',
  components: {
    UserLabel
  },
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
    // popup 'back' button action
    // backAction() {
    //   console.log('back action');
    // },
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
  height: 400px;
  padding: 5px 15px 15px 15px;
  /deep/ .settings-user-label {
    padding: 0px;
  }
}
</style>
