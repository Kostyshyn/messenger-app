<template>
  <transition name="error-fade" mode="out-in">
    <ul class="field-errors" v-if="showErrors">
      <li v-for="(error, index) in errors" :key="index">
        {{ error }}
      </li>
    </ul>
  </transition>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ErrorsList',
  props: {
    errors: {
      type: Array,
      default: () => []
    },
    showErrors: {
      type: [Boolean, Number],
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {}
};
</script>
<style scoped lang="scss">
.error-fade-enter-active,
.error-fade-leave-active {
  transition: 0.15s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.error-fade-enter,
.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.field-errors {
  li {
    font-size: 14px;
    line-height: 16px;
    color: $red-font-color;
    font-weight: 600;
    margin: 2px 0;
  }
}
</style>
