<template>
  <div v-on="$listeners" class="mode-item" :class="className" @click="change">
    <div class="mode-icon" v-if="isIcons">
      <Icon v-show="value" :name="iconOn" />
      <Icon v-show="!value" :name="iconOff" />
    </div>
    <div class="mode-label" :class="{ 'no-icons': !isIcons }">
      {{ label }}
    </div>
    <Check class="mode-check" :value="value" />
  </div>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/Helpers/Icon.vue';
import Check from '@/components/General/Form/Check.vue';

export default {
  name: 'ModeListItem',
  components: {
    Icon,
    Check
  },
  props: {
    label: {
      type: String,
      required: true
    },
    iconOn: {
      type: String,
      default: ''
    },
    iconOff: {
      type: String,
      default: ''
    },
    className: {
      type: [String, Array]
    },
    value: {
      type: [Boolean, Number],
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    isIcons() {
      return this.iconOn && this.iconOff;
    }
  },
  methods: {
    change() {
      this.$emit('input', !this.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.mode-item {
  display: flex;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: $light-grey-color;
  }
  .mode-icon {
    display: flex;
    font-size: 20px;
    height: 36px;
    width: 30px;
    align-items: center;
    justify-content: center;
    /deep/ svg {
      fill: $dark-grey-color;
    }
  }
  .mode-label {
    user-select: none;
    font-size: 16px;
    line-height: 36px;
    padding: 0px 10px;
    font-weight: 600;
    color: $black-font-color;
    &.no-icons {
      margin-left: 30px;
    }
  }
  .mode-check {
    margin-left: auto;
  }
}
</style>
