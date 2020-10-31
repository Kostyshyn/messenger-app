<template>
  <div :class="classList">
    <img
      crossorigin
      :src="userImage"
      :alt="user.username"
      class="user-img"
      :class="{ hasImages }"
      @click="openCarousel"
    />
    <div class="user-info">
      <h3 class="username" :style="fontSize">{{ fullName }}</h3>
      <p class="url">@{{ user.username }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import imagePath from '@/utils/imagePath';
import config from '@/config';

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
    return {
      maxStr: 13,
      imageSizeSuffix: config.IMAGES.USER_IMAGE_SIZE,
      showCarousel: false
    };
  },
  computed: {
    ...mapGetters({
      settings: 'app/settings',
      baseUrl: 'app/baseUrl',
      token: 'user/token'
    }),
    classList() {
      return ['user-label', { big: this.big }, this.className];
    },
    hasImages() {
      return !!this.user.profile_image;
    },
    userImage() {
      const { baseUrl, user, token, settings } = this;
      if (user.profile_image) {
        const image = imagePath(
          user.profile_image.path,
          this.imageSizeSuffix,
          `?token=${token}`
        );
        return `${baseUrl}/${image}`;
      }
      return `${baseUrl}/${settings.DEF_PROFILE_IMG}`;
    },
    fullName() {
      const { first_name, last_name } = this.user;
      return `${first_name} ${last_name}`;
    },
    fontSize() {
      const { first_name } = this.user;
      if (first_name.length > this.maxStr) {
        return {
          'font-size': '16px'
        };
      }
      return {
        'font-size': '18px'
      };
    }
  },
  methods: {
    ...mapActions({
      open: 'app/openCarousel'
    }),
    openCarousel() {
      if (this.hasImages) {
        this.open({
          id: this.user._id
        });
      }
    }
  }
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
    &.hasImages {
      cursor: pointer;
    }
  }
  .user-info {
    padding-left: 10px;
    /*width: calc(100% - 48px);*/
    width: calc(100% - 76px);
    .username {
      max-height: 46px;
      color: $black-font-color;
      font-weight: 600;
      margin: 0 0 3px 0;
      line-height: 20px;
      @include line-clamp(2);
    }
    .url {
      height: 16px;
      color: $dark-grey-font-color;
      font-size: 14px;
      @include truncate-text;
    }
  }
  &.big {
    .user-img {
      width: 68px;
      height: 68px;
    }
  }
  @media (max-width: $sm) {
    &.big {
      .user-img {
        width: 88px;
        height: 88px;
      }
    }
    .user-info {
      .url {
        height: 18px;
        line-height: 18px;
        font-size: 16px;
      }
    }
  }
}
</style>
