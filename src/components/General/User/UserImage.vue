<template>
  <div class="user-image" :class="[className, { border }]" v-on="$listeners">
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
    },
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 48
    }
  },
  data() {
    return {};
  },
  computed: {
    style() {
      // TODO: set image size form props
      const { size } = this;
      return {
        width: size + 'px',
        height: size + 'px'
      };
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.user-image {
  display: flex;
  padding: 2px;
  a {
    display: inline-block;
  }
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  &.border {
    img {
      box-shadow: 0 0 0 2px $green-color;
    }
  }
  @media (max-width: $sm) {
    img {
      width: 68px;
      height: 68px;
    }
  }
}
</style>
