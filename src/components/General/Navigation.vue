<template>
  <div class="navigation-wrap">
    <div class="navigation">
      <UserSidebar />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserSidebar from '@/components/General/UserSidebar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  components: {
    UserSidebar
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      token: 'user/token',
      baseUrl: 'app/baseUrl'
    })
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.navigation-wrap {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: $white-background-color;
  .navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    box-shadow: $primary-shadow;
    .auth-link {
      margin-right: 10px;
    }
    .navigation-right {
      display: flex;
      margin-left: auto;
      .navigation-user-link {
        margin-right: 10px;
      }
      .logout {
        .icon {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
