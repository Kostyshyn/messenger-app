<template>
  <router-link v-if="to" :to="to" :class="btnClass" v-on="$listeners">
    <slot />
  </router-link>
  <button v-else :type="type" :class="btnClass" v-on="$listeners">
    <Icon v-if="loading" name="spinner" spin />
    <slot v-else />
  </button>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/General/Icon.vue';

const TYPES = ['button', 'submit'];
const COLORS = ['secondary', 'primary', 'error'];

export default {
  name: 'Button',
  components: { Icon },
  props: {
    to: {
      type: String,
      default: ''
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator: type => {
        return TYPES.includes(type);
      },
      default: 'button'
    },
    color: {
      type: String,
      validator: color => {
        return COLORS.includes(color);
      },
      default: 'secondary'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass() {
      return [
        'button',
        this.color,
        { ripple: this.ripple },
        { full: this.fullWidth }
      ];
    }
  }
};
</script>
<style lang="scss" scoped>
.button {
  border-radius: 2px;
  display: inline-flex;
  height: 36px;
  line-height: 34px;
  flex: 0 0 auto;
  font-size: 14px;
  justify-content: center;
  padding: 0px 15px;
  min-width: 80px;
  outline: 0;
  text-transform: uppercase;
  text-decoration: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
  position: relative;
  vertical-align: middle;
  -webkit-user-select: none;
  user-select: none;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  box-shadow: $block-shadow;
  &.primary {
    background-color: $primary-color;
    color: $white-font-color;
  }
  &.secondary {
    background-color: $grey-color;
    color: $black-font-color;
  }
  &.ripple {
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      background-image: radial-gradient(circle, #000 10%, transparent 10%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(10, 10);
      opacity: 0;
      transition: transform 0.5s, opacity 1s;
    }

    &:active:after {
      transform: scale(0, 0);
      opacity: 0.2;
      transition: 0s;
    }
  }
}
</style>
