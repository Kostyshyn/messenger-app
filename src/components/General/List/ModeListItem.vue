<template>
  <ListItem
    v-on="$listeners"
    :className="['mode-item', className]"
    @click.native="change"
  >
    <div class="mode-icon" v-if="isIcons">
      <Icon v-show="value" :name="iconOn" />
      <Icon v-show="!value" :name="iconOff" />
    </div>
    <div class="mode-label" :class="{ 'no-icons': !isIcons }">
      {{ label }}
    </div>
    <SwitchField class="mode-check" :value="value" />
  </ListItem>
</template>

<script>
// @ is an alias to /src
import ListItem from '@/components/General/List/ListItem.vue';
import Icon from '@/components/General/Helpers/Icon.vue';
import SwitchField from '@/components/General/Form/SwitchField.vue';

export default {
  name: 'ModeListItem',
  components: {
    ListItem,
    Icon,
    SwitchField
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
    font-size: $list-item-font;
    line-height: 36px;
    padding: 0 10px;
    font-weight: 600;
    color: $black-font-color;
    &.no-icons {
      margin-left: 30px;
    }
  }
  .mode-check {
    margin-left: auto;
  }
  @media (max-width: $sm) {
    .mode-label {
      font-size: $list-item-font-sm;
    }
  }
}
</style>
