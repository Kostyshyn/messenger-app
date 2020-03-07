<template>
  <div class="navigation-wrap">
    <div v-if="loggedIn" class="navigation">
      <UserSidebar />
    </div>
    <div v-else class="navigation">
      <Button className="auth-link" to="/login" ripple>
        Login
      </Button>
      <Button className="auth-link" to="/register" color="primary" ripple>
        Register
      </Button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Helpers/Button.vue';
import UserSidebar from '@/components/General/UserSidebar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  components: {
    UserSidebar,
    Button
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedId',
      user: 'user/user',
      token: 'user/token',
      baseUrl: 'app/baseUrl'
    })
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding: 0px 5px;
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
</style>
