<template>
  <router-link
    v-if="to"
    :exact="exact"
    :to="to"
    class="list-item link"
    :class="className"
  >
    <slot />
  </router-link>
  <div v-else class="list-item" :class="className">
    <slot />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ListItem',
  props: {
    className: {
      type: [String, Array]
    },
    to: {
      type: String,
      default: ''
    },
    exact: {
      type: Boolean,
      default: false
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
.list-item {
  display: flex;
  padding: 5px 10px;
  cursor: pointer;
  &.link {
    text-decoration: none;
    &.router-link-active {
      background-color: $light-grey-color;
    }
  }
  &:hover {
    background-color: $light-grey-color;
  }
  /* @media (max-width: $sm) {} */
}
</style>
