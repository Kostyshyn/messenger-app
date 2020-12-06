<template>
  <div
    :class="[
      'chip',
      className,
      color,
      { button, flat, 'has-icon': $slots.icon }
    ]"
  >
    <div class="chip-label">{{ label }}</div>
    <slot name="icon" />
  </div>
</template>

<script>
// @ is an alias to /src
const COLORS = [
  'success',
  'secondary',
  'primary',
  'warning',
  'error',
  'transparent'
];

export default {
  name: 'Chip',
  components: {},
  props: {
    label: {
      type: [String, Number],
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      validator: color => {
        return COLORS.includes(color);
      },
      default: 'secondary'
    },
    button: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style scoped lang="scss">
.chip {
  display: flex;
  height: 24px;
  width: fit-content;
  min-width: 24px;
  padding: 0 8px;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: $block-shadow;
  color: $white-font-color;
  .chip-label {
    font-size: 14px;
    line-height: 24px;
    @include truncate-text;
  }
  &.flat {
    box-shadow: none;
  }
  &.success {
    background-color: $green-color;
  }
  &.primary {
    background-color: $primary-color;
  }
  &.secondary {
    background-color: $grey-color;
    color: $black-font-color;
  }
  &.warning {
    background-color: $orange-color;
  }
  &.error {
    background-color: $red-color;
  }
  &.primary,
  &.error {
    font-weight: 400;
  }
  &.button {
    cursor: pointer;
    &:hover {
      &.success {
        background-color: $light-green-color;
      }
      &.primary {
        background-color: $light-primary-color;
      }
      &.warning {
        background-color: $light-orange-color;
      }
      &.error {
        background-color: $light-red-color;
      }
    }
  }
}
</style>
