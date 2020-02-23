<template>
  <div class="field" :class="{ error: isError }">
    <input
      :type="type"
      :name="name"
      :class="['field-input', className]"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :autocomplete="autocomplete"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <ul class="field-errors" v-if="errors.length">
      <li v-for="(error, index) in errors" :key="index">
        {{ error }}
      </li>
    </ul>
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
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.field {
  width: 100%;
  min-height: 60px;
  .field-input {
    border: 1px solid $light-grey-color;
    background-color: $light-grey-color;
    border-radius: 2px;
    height: 34px;
    font-size: 16px;
    color: $black-font-color;
    padding: 0px 10px;
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
    }
  }
}
</style>
