<template>
  <Drawer :open="open">
    <template slot-scope="{ toggle }">
      <div class="toggle-btn" @click="toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </template>
    <template #sidebar>
      <div class="user-sidebar">
        sidebar
      </div>
    </template>
  </Drawer>
</template>

<script>
// @ is an alias to /src
// import Icon from '@/components/General/Icon.vue';
import Drawer from '@/components/Helpers/Drawer.vue';
import { mapGetters } from 'vuex';
import api from '@/services/api';

export default {
  name: 'UserSidebar',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Drawer
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      token: 'user/token',
      baseUrl: 'app/baseUrl'
    }),
  },
  methods: {
    logout() {
      api.logout();
    }
  }
};
</script>
<style lang="scss" scoped>
.user-sidebar {
  padding: 20px;
}
.toggle-btn {
  cursor: pointer;
  display: inline-block;
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 4px;
  span {
    display: inline-block;
    position: absolute;
    width: 30px;
    height: 2px;
    left: 5px;
    background-color: $primary-color;
    &:nth-last-child(1) {
      top: 10px;
    }
    &:nth-last-child(2) {
      top: 19px;
    }
    &:nth-last-child(3) {
      top: 28px;
    }
  }
  @include ripple;
}
</style>
