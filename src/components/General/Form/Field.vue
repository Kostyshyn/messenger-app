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
          :readonly="readonly"
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
    <ErrorsList :errors="errors" :showErrors="isError" />
  </div>
</template>

<script>
// @ is an alias to /src
import ErrorsList from '@/components/General/Form/ErrorsList';
const TYPES = ['text', 'email', 'password'];

export default {
  name: 'Field',
  components: {
    ErrorsList
  },
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
    readonly: {
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
      const { readonly, className } = this;
      return [
        'field-input',
        className,
        { readonly },
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
      @include truncate-text;
      &.focus {
        outline: none;
        background-color: transparent;
        border: 1px solid $grey-color;
      }
    }
    .field-prefix {
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      &.focus {
        border-right: none;
      }
    }
    .field-suffix {
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      &.focus {
        border-left: none;
      }
    }
    .field-input {
      border: 1px solid $light-grey-color;
      background-color: $light-grey-color;
      border-radius: 2px;
      height: 34px;
      font-size: 16px;
      color: $black-font-color;
      padding: 1px 8px 0 8px;
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
        padding-left: 0;
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      &.suffix {
        padding-right: 0;
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &.readonly {
        color: $dark-grey-color;
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
}
</style>
