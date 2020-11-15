<template>
  <div :class="['chip', className, color, { button, 'has-icon': $slots.icon }]">
    <div class="chip-label">{{ label }}</div>
    <slot name="icon" />
  </div>
</template>

<script>
// @ is an alias to /src
const COLORS = ['success', 'secondary', 'primary', 'error', 'transparent'];

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
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: $block-shadow;
  .chip-label {
    font-size: 14px;
    line-height: 24px;
    @include truncate-text;
  }
  &.success {
    background-color: $green-color;
    color: $white-font-color;
  }
  &.primary {
    background-color: $primary-color;
    color: $white-font-color;
  }
  &.secondary {
    background-color: $grey-color;
    color: $black-font-color;
  }
  &.error {
    background-color: $red-color;
    color: $white-font-color;
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
      &.error {
        background-color: $light-red-color;
      }
    }
  }
}
</style>
