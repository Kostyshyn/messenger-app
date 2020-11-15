<template>
  <div class="navigation-wrap" :class="{ invert }">
    <div class="navigation">
      <slot />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  components: {},
  props: {
    invert: {
      type: Boolean,
      default: false
    }
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
  &.invert {
    background-color: $primary-color;
  }
}
</style>
