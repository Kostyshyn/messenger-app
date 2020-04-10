<template>
  <div class="overlay" :class="{ blur: blur }" :style="{ 'z-index': zIndex }">
    <slot></slot>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Overlay',
  components: {},
  props: {
    blur: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 10
    }
  }
};
</script>
<style lang="scss" scoped>
.overlay {
  display: block;
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  left: 0px;
  top: 0px;
  &.blur {
    backdrop-filter: blur(2px);
  }
}
</style>
