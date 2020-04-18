<template>
  <div :class="classList">
    <img :src="userImage" :alt="user.username" class="user-img" />
    <div class="user-info">
      <h3 class="username">{{ user.first_name }} {{ user.last_name }}</h3>
      <p class="url">@{{ user.username }}</p>
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
      baseUrl: 'app/baseUrl',
      token: 'user/token'
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
    display: flex;
    flex: 1 0 auto;
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
      color: $black-font-color;
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 3px 0;
      @include trancate-text;
    }
    .url {
      height: 16px;
      color: $dark-grey-font-color;
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
