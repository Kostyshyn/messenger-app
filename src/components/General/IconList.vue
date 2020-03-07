<template>
  <div class="icon-list" :class="className" v-on="$listeners">
    <div
      class="list-item"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('action', item.action)"
    >
      <div class="item-icon">
        <Icon :name="item.icon" />
      </div>
      <div class="item-label">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/Helpers/Icon.vue';

export default {
  name: 'IconList',
  components: { Icon },
  props: {
    className: {
      type: [String, Array]
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.icon-list {
  .list-item {
    display: flex;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: $light-grey-color;
    }
    .item-icon {
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
    .item-label {
      user-select: none;
      font-size: 16px;
      line-height: 36px;
      padding: 0px 10px;
      font-weight: 600;
      color: $black-font-color;
    }
  }
}
</style>
