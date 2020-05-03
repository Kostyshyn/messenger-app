<template>
  <div :class="classList" :style="style">
    <slot></slot>
  </div>
</template>

<script>
// @ is an alias to /src
const POSITIONS = ['fixed', 'absolute'];

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
    },
    position: {
      type: String,
      validator: pos => {
        return POSITIONS.includes(pos);
      },
      default: 'fixed'
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    style() {
      return {
        'z-index': this.zIndex,
        position: this.position
      };
    },
    classList() {
      return ['overlay', { blur: this.blur }, this.className];
    }
  }
};
</script>
<style lang="scss" scoped>
.overlay {
  display: block;
  width: 100%;
  height: 100%;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  left: 0px;
  top: 0px;
  &.blur {
    backdrop-filter: blur(2px);
  }
}
</style>
