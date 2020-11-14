<template>
  <div class="table-cell" :class="[{ header, resetStyles, sort }]">
    <div class="cell-content">
      <slot />
    </div>
    <div v-if="header && sort" class="cell-sort">
      <MenuDown v-if="sortValue === sortValues[0]" />
      <MenuUp v-if="sortValue === sortValues[1]" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuUp from 'vue-material-design-icons/MenuUp.vue';
import MenuDown from 'vue-material-design-icons/MenuDown.vue';

export default {
  name: 'Cell',
  components: {
    MenuUp,
    MenuDown
  },
  props: {
    header: {
      type: Boolean,
      default: false
    },
    resetStyles: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Boolean,
      default: false
    },
    sortValue: {
      type: String
    },
    sortValues: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style scoped lang="scss">
.table-cell {
  display: flex;
  border-bottom: 1px solid $grey-color;
  min-width: 38px;
  min-height: 47px;
  box-sizing: border-box;
  &:last-child {
    border-bottom: none;
  }
  .cell-content {
    padding: 15px;
    font-size: 16px;
    line-height: 16px;
  }
  &.resetStyles {
    .cell-content {
      padding: 0;
      width: 100%;
    }
  }
  &.header {
    min-height: 40px;
    .cell-content {
      padding: 12px;
      font-size: 14px;
      font-weight: 600;
      color: $dark-grey-font-color;
    }
  }
  &.sort {
    cursor: pointer;
    &:hover {
      background-color: $light-grey-color;
    }
    .cell-content {
      padding-right: 5px;
    }
    .cell-sort {
      display: flex;
      align-self: center;
      height: 100%;
      margin-right: 5px;
      /deep/ .material-design-icon {
        display: flex;
        color: $dark-grey-font-color;
      }
    }
  }
}
</style>
