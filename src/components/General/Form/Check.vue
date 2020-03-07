<template>
  <div :class="['check', className]">
    <input
      :type="type"
      :name="name"
      :id="name"
      class="check-input"
      :checked="value"
      :disabled="disabled"
      @change="$emit('input', $event.target.checked)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <label class="check-btn" :for="name" />
    <label
      v-if="$slots.default"
      class="check-btn-text"
      :class="{ disabled: disabled }"
      :for="name"
    >
      <slot />
    </label>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Check',
  components: {},
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    className: {
      type: [String, Array]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      type: 'checkbox'
    };
  },
  computed: {
    checked() {
      return true;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.check {
  display: inline-flex;
  cursor: pointer;
  position: relative;
  flex-direction: row;
  align-items: center;
  padding: 3px 5px;
  .check-btn-text {
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    &.disabled {
      cursor: default;
      pointer-events: none;
      opacity: 0.6;
    }
  }
  .check-btn {
    display: inline-block;
    position: relative;
    width: 42px;
    height: 18px;
    cursor: pointer;
    border-radius: 9px;
    background-color: $grey-color;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      left: 1px;
      top: 1px;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      transform: translateX(0);
      background-color: $white-background-color;
    }
  }
  .check-input:checked + .check-btn {
    background-color: $primary-color;
    &:after {
      transform: translateX(24px);
    }
  }
  .check-input:disabled + .check-btn {
    cursor: default;
    pointer-events: none;
    opacity: 0.6;
  }
  .check-input {
    display: none;
  }
}
</style>
