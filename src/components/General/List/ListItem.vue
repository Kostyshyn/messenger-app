<template>
  <div class="list-item" :class="className">
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
  &:hover {
    background-color: $light-grey-color;
  }
  /* @media (max-width: $sm) {} */
}
</style>
