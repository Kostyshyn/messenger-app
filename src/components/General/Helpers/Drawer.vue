<template>
  <div class="drawer">
    <slot :toggle="toggle" />
    <div class="sidebar" :class="className" :style="style">
      <slot name="sidebar" />
    </div>
    <transition name="fade" mode="out-in">
      <Overlay v-if="open" @click.native="backdrop" />
    </transition>
  </div>
</template>

<script>
const DIRECTIONS = ['left', 'right'];

// @ is an alias to /src
import Overlay from '@/components/General/Helpers/Overlay.vue';

export default {
  name: 'Drawer',
  components: {
    Overlay
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      validator: direction => {
        return DIRECTIONS.includes(direction);
      },
      default: 'left'
    },
    zIndex: {
      type: Number,
      default: 11
    },
    width: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {};
  },
  computed: {
    style() {
      const { direction, width, zIndex, open } = this;
      if (open) {
        return {
          left: direction === 'left' ? '0px' : 'auto',
          right: direction === 'right' ? '0px' : 'auto',
          width: `${width}px`,
          'z-index': zIndex,
          transform: 'translate3d(0, 0, 0)'
        };
      }
      return {
        left: direction === 'left' ? '0px' : 'auto',
        right: direction === 'right' ? '0px' : 'auto',
        width: `${width}px`,
        'z-index': zIndex,
        transform:
          direction === 'left'
            ? `translate3d(${-width}px, 0, 0)`
            : `translate3d(${width}px, 0, 0)`
      };
    },
    className() {
      return { open: this.open };
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle', !this.open);
    },
    backdrop() {
      this.$emit('toggle', false);
    }
  },
  watch: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.drawer {
  .sidebar {
    z-index: 9999;
    position: fixed;
    will-change: transform;
    height: 100%;
    max-width: 100%;
    top: 0;
    transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
    background: $white-background-color;
    overflow-y: auto;
    overflow-x: hidden;
    word-wrap: break-word;
    &.open {
      box-shadow: $block-shadow;
    }
  }
}
</style>
