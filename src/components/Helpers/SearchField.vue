<template>
  <div class="search-field">
    <Field
      noErrors
      placeholder="Search"
      ref="field"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      @input="$emit('input', $event)"
    >
      <template slot="prefix">
        <Icon
          name="search"
          class="search"
          v-show="!loading"
          @click.native="focusField"
        />
        <div class="search-loader" v-show="loading">
          <div class="search-preloader"></div>
        </div>
      </template>
      <template slot="suffix">
        <Icon
          v-if="!readonly"
          v-show="value.length"
          name="clear"
          class="clear"
          @click.native="clear"
        />
      </template>
    </Field>
  </div>
</template>

<script>
// @ is an alias to /src
import Field from '@/components/General/Form/Field.vue';
import Icon from '@/components/Helpers/Icon.vue';
// import { mapActions } from 'vuex';

export default {
  name: 'SearchField',
  components: {
    Field,
    Icon
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    clear() {
      if (!this.readonly) {
        this.$emit('input', '');
      }
    },
    focusField() {
      this.$refs.field.focus();
    }
  },
  watch: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.search-field {
  display: flex;
  position: relative;
  margin-bottom: 15px;
  .search-loader {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 34px;
    width: 34px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    .search-preloader {
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 2px solid $dark-grey-color;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: spin 0.75s infinite linear;
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  .search,
  .clear {
    position: absolute;
    top: 0px;
    height: 34px;
    width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    /deep/ svg {
      fill: $dark-grey-color;
    }
  }
  .search {
    left: 0px;
  }
  .clear {
    cursor: pointer;
    right: 0px;
  }
}
</style>
