<template>
  <ListItem :className="className">
    <UserImage :image="image" />
    <div class="item-name">
      {{ fullName }}
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
.item-name {
  user-select: none;
  font-size: $list-item-font;
  line-height: 38px;
  padding: 0px 10px;
  font-weight: 600;
  color: $black-font-color;
}
</style>
