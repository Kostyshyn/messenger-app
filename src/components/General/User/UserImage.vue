<template>
  <div class="user-image" :class="className" v-on="$listeners">
    <router-link v-if="to" :to="to">
      <img crossorigin :src="image" alt="user image" />
    </router-link>
    <img crossorigin v-else :src="image" alt="user image" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'UserImage',
  components: {},
  props: {
    className: {
      type: [String, Array]
    },
    to: {
      type: [Object, String],
      default: ''
    },
    image: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.user-image {
  display: flex;
  a {
    display: inline-block;
  }
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  @media (max-width: $sm) {
    img {
      width: 68px;
      height: 68px;
    }
  }
}
</style>
