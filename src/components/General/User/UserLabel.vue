<template>
  <div :class="classList">
    <img :src="userImage" :alt="user.username" class="user-img" />
    <div class="user-info">
      <h3 class="username">{{ user.username }}</h3>
      <p class="url">{{ user.url }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';

export default {
  name: 'UserLabel',
  components: {},
  props: {
    user: {
      type: Object,
      required: true
    },
    big: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      token: 'user/token',
      baseUrl: 'app/baseUrl'
    }),
    classList() {
      return ['user-label', { big: this.big }, this.className];
    },
    userImage() {
      const { baseUrl, user, token } = this;
      return `${baseUrl}/${user.profile_image.url}?token=${token}`;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.user-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  .user-img {
    display: inline-block;
    width: 48px;
    height: 48px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
  }
  .user-info {
    padding-left: 10px;
    width: calc(100% - 48px);
    .username {
      height: 20px;
      color: $primary-color;
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 3px 0;
      @include trancate-text;
    }
    .url {
      height: 16px;
      color: $dark-grey-color;
      font-size: 14px;
      @include trancate-text;
    }
  }
  &.big {
    .user-img {
      width: 68px;
      height: 68px;
    }
  }
}
</style>
