<template>
  <router-link
    v-if="to"
    :to="to"
    :exact="exact"
    :class="['link', btnClass, { disabled: disabled }]"
    v-on="$listeners"
  >
    <slot />
  </router-link>
  <button
    v-else
    :type="type"
    :class="btnClass"
    :disabled="disabled"
    v-on="$listeners"
  >
    <Icon v-if="loading" name="spinner" spin />
    <slot v-else />
  </button>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/General/Icon.vue';

const TYPES = ['button', 'submit'];
const COLORS = ['secondary', 'primary', 'error', 'transparent'];

export default {
  name: 'Button',
  components: { Icon },
  props: {
    className: {
      type: [String, Array]
    },
    to: {
      type: String,
      default: ''
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    },
    disabled: {
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
        { full: this.fullWidth },
        this.className
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
  line-height: 36px;
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
  box-sizing: border-box;
  box-shadow: $block-shadow;
  &:disabled,
  &.disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
  &.disabled {
    pointer-events: none;
  }
  &.primary {
    background-color: $primary-color;
    color: $white-font-color;
  }
  &.secondary {
    background-color: $grey-color;
    color: $black-font-color;
  }
  &.transparent {
    background-color: transparent;
    color: $primary-color;
    box-shadow: none;
    &.link {
      position: relative;
      &:before {
        content: '';
        display: block;
        position: absolute;
        height: 2px;
        width: 0px;
        bottom: 5px;
        background-color: $primary-color;
        transition: 0s;
      }
      &:hover {
        &:before {
          width: calc(100% - 30px);
          transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        }
      }
      &.router-link-active {
        &:before {
          width: calc(100% - 30px);
          transition: 0s;
        }
      }
    }
  }
  @include ripple;
}
</style>
