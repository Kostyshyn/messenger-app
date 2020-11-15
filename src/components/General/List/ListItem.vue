<template>
  <router-link v-if="to" :to="to" class="list-item link" :class="className">
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
  }
  &:hover {
    background-color: $light-grey-color;
  }
  /* @media (max-width: $sm) {} */
}
</style>
