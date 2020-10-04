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
    <slot />
  </button>
</template>

<script>
// @ is an alias to /src

const TYPES = ['button', 'submit'];
const COLORS = ['secondary', 'primary', 'error', 'transparent'];

export default {
  name: 'Button',
  components: {},
  props: {
    className: {
      type: String,
      default: ''
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
    round: {
      type: Boolean,
      default: false
    },
    flat: {
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
    }
  },
  computed: {
    btnClass() {
      const { color, ripple, round, flat, fullWidth: full, className } = this;
      return [
        'button',
        color,
        { ripple },
        { flat },
        { round },
        { full },
        className
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
  line-height: 38px;
  flex: 0 0 auto;
  font-size: 14px;
  justify-content: center;
  padding: 0 15px;
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
  &.flat {
    box-shadow: none;
  }
  &.primary {
    background-color: $primary-color;
    color: $white-font-color;
    &:hover {
      background-color: $light-primary-color;
    }
  }
  &.secondary {
    background-color: $grey-color;
    color: $black-font-color;
  }
  &.error {
    background-color: $red-color;
    color: $white-font-color;
    &:hover {
      background-color: $light-red-color;
    }
  }
  &.primary,
  &.error {
    font-weight: 400;
  }
  &.transparent {
    background-color: transparent;
    color: $primary-font-color;
    box-shadow: none;
    &.link {
      position: relative;
      &:before {
        content: '';
        display: block;
        position: absolute;
        height: 2px;
        width: 0;
        bottom: 5px;
        background-color: $primary-color;
        transition: 0s;
      }
      &:hover {
        background-color: transparent;
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
  &.secondary,
  &.transparent {
    &:hover {
      background-color: $light-grey-color;
    }
  }
  &:disabled,
  &.disabled {
    opacity: 0.8;
    pointer-events: none;
    color: $dark-grey-font-color;
    background-color: $grey-color;
  }
  &.ripple {
    @include ripple;
  }
  &.round {
    min-width: 36px;
    width: 36px;
    border-radius: 50%;
  }
  .material-design-icon {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
