<template>
  <ListItem :className="className">
    <UserImage :image="image" />
    <div class="item-info">
      <div class="item-name">{{ fullName }}</div>
      <div class="item-text">
        <slot name="text" />
      </div>
    </div>
  </ListItem>
</template>

<script>
// @ is an alias to /src
import ListItem from '@/components/General/List/ListItem.vue';
import UserImage from '@/components/General/User/UserImage.vue';
import { mapGetters } from 'vuex';
import imagePath from '@/utils/imagePath';

export default {
  name: 'UserListItem',
  components: {
    ListItem,
    UserImage
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    className: {
      type: [String, Array]
    }
  },
  data() {
    return {
      imageSizeSuffix: '_68_68'
    };
  },
  computed: {
    ...mapGetters({
      settings: 'app/settings',
      baseUrl: 'app/baseUrl',
      token: 'user/token'
    }),
    image() {
      const { baseUrl, user, token } = this;
      if (user.profile_image) {
        const image = imagePath(
          user.profile_image.path,
          this.imageSizeSuffix,
          `?token=${token}`
        );
        return `${baseUrl}/${image}`;
      }
      return `${baseUrl}/${this.settings.DEF_PROFILE_IMG}`;
    },
    fullName() {
      const { first_name, last_name } = this.user;
      return `${first_name} ${last_name}`;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.item-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8px;
  .item-name {
    user-select: none;
    font-size: $list-heading-item-font;
    /*line-height: 38px;*/
    font-weight: 600;
    color: $black-font-color;
    margin-bottom: 2px;
  }
  .item-text {
    /*min-height: 27px;*/
    font-size: $list-text-item-font;
    font-weight: 400;
    color: $dark-grey-color;
    @include line-clamp(2);
  }
}
</style>
