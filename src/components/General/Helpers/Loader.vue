<template>
  <div class="loader" :class="className" v-if="loading">
    <div class="circle-preloader"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Loader',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    className: {
      type: [String, Array]
    }
  },
  components: {},
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .circle-preloader {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 2px solid $light-grey-color;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s infinite linear;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.loader-enter-active,
.loader-leave-active {
  transition: 0.15s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.loader-enter,
.loader-leave-to {
  opacity: 0;
}
</style>
