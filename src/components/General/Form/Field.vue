<template>
  <div class="field" :class="fieldClass" :style="fieldStyle">
    <label class="label">
      <p class="field-label" v-if="label">{{ label }}</p>
      <div class="input-wrapper">
        <div
          class="field-prefix"
          :class="{ focus: focusState }"
          v-if="$slots.prefix"
        >
          <slot name="prefix" />
        </div>
        <input
          ref="input"
          :type="type"
          :name="name"
          :class="inputClass"
          :placeholder="placeholder"
          :value="value"
          :disabled="disabled"
          :autocomplete="autocomplete"
          @input="$emit('input', $event.target.value)"
          @focus="onFocus"
          @blur="onBlur"
        />
        <div
          class="field-suffix"
          :class="{ focus: focusState }"
          v-if="$slots.suffix"
        >
          <slot name="suffix" />
        </div>
      </div>
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
    noErrors: {
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
      focusState: false
    };
  },
  computed: {
    isError() {
      return this.errors.length;
    },
    fieldStyle() {
      if (this.noErrors) {
        return {
          'min-height': '34px'
        };
      }
      if (this.label) {
        return {
          'min-height': '80px'
        };
      }
      return {
        'min-height': '60px'
      };
    },
    fieldClass() {
      return [
        {
          error: this.isError
        },
        {
          'no-errors': this.noErrors
        }
      ];
    },
    inputClass() {
      return [
        'field-input',
        this.className,
        {
          prefix: this.$slots.prefix
        },
        {
          suffix: this.$slots.suffix
        }
      ];
    }
  },
  methods: {
    onFocus() {
      this.focusState = true;
      this.$emit('focus');
    },
    onBlur() {
      this.focusState = false;
      this.$emit('blur');
    },
    focus() {
      this.$refs.input.focus();
    }
  },
  watch: {},
  mounted() {}
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
  .label {
    display: block;
  }
  .field-label {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
    color: $dark-grey-font-color;
  }
  .input-wrapper {
    display: flex;
    position: relative;
    .field-prefix,
    .field-suffix {
      height: 34px;
      min-width: 34px;
      max-width: 102px;
      box-sizing: border-box;
      border: 1px solid $light-grey-color;
      background-color: $light-grey-color;
      border-radius: 2px;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      @include trancate-text;
      &.focus {
        outline: none;
        background-color: transparent;
        border: 1px solid $grey-color;
      }
    }
    .field-prefix {
      border-right: none;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      &.focus {
        border-right: none;
      }
    }
    .field-suffix {
      border-left: none;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      &.focus {
        border-left: none;
      }
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
      &:focus {
        outline: none;
        background-color: transparent;
        border: 1px solid $grey-color;
      }
      &.prefix {
        padding-left: 0px;
        border-left: none;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
      &.suffix {
        padding-right: 0px;
        border-right: none;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
      }
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
