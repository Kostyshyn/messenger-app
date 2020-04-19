<template>
  <div class="field" :class="{ error: isError }" :style="fieldStyle">
    <label class="label">
      <p class="field-label">{{ label }}</p>
      <input
        ref="input"
        :type="type"
        :name="name"
        :class="['field-input', className]"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :autocomplete="autocomplete"
        @input="$emit('input', $event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
      />
    </label>
    <transition name="error-fade" mode="out-in">
      <ul class="field-errors" v-if="isError">
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
const TYPES = ['text', 'email', 'password'];

export default {
  name: 'Field',
  components: {},
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    autocomplete: {
      type: String,
      default: 'on'
    },
    placeholder: {
      type: String,
      default: ''
    },
    className: {
      type: [String, Array]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator: type => {
        return TYPES.includes(type);
      },
      default: 'text'
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    isError() {
      return this.errors.length;
    },
    fieldStyle() {
      if (this.label) {
        return {
          'min-height': '80px'
        };
      }
      return {
        'min-height': '60px'
      };
    }
  },
  methods: {
    onFocus() {
      this.$emit('focus');
    },
    onBlur() {
      this.$emit('blur');
    },
    focus() {
      this.$refs.input.focus();
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.error-fade-enter-active,
.error-fade-leave-active {
  transition: 0.15s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.error-fade-enter,
.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.field {
  width: 100%;
  min-height: 80px;
  .label {
    display: block;
  }
  .field-label {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
    color: $dark-grey-font-color;
  }
  .field-input {
    border: 1px solid $light-grey-color;
    background-color: $light-grey-color;
    border-radius: 2px;
    height: 34px;
    line-height: 35px;
    font-size: 16px;
    color: $black-font-color;
    padding: 0px 8px;
    outline: none;
    box-sizing: border-box;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    width: 100%;
    &:focus,
    &:active {
      outline: none;
      background-color: transparent;
      border: 1px solid $grey-color;
    }
  }
  &.error {
    .field-input {
      outline: none;
      background-color: transparent;
      border: 1px solid $red-font-color;
      color: $red-font-color;
    }
  }
  .field-errors {
    li {
      font-size: 14px;
      color: $red-font-color;
      font-weight: 600;
      margin-top: 2px;
    }
  }
}
</style>
