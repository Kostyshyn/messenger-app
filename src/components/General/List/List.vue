<template>
  <div class="list-wrapper" :class="className" v-on="$listeners">
    <p class="list-header" v-if="heading">{{ heading }}</p>
    <div class="list">
      <slot />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'List',
  components: {},
  props: {
    className: {
      type: [String, Array]
    },
    list: {
      type: Array,
      default: () => []
    },
    heading: {
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
.list-wrapper {
  .list-header {
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
    color: $primary-font-color;
    padding: 0px 15px;
    margin: 10px 0px;
  }
}
</style>
