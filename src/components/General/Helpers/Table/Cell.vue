<template>
  <div
    class="table-cell"
    :class="[colType, { header, fixedHeader, sort, activeSort }]"
    :style="cellStyle"
  >
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
    type: {
      type: String,
      default: 'text'
    },
    sort: {
      type: Boolean,
      default: false
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    activeSort: {
      type: Boolean,
      default: false
    },
    sortValue: {
      type: String
    },
    sortValues: {
      type: Array,
      default: () => []
    },
    offsetFromHeader: {
      type: Number,
      default: 0
    }
  },
  computed: {
    colType() {
      return this.header ? '' : `col-type-${this.type}`;
    },
    cellStyle() {
      const { header, fixedHeader, offsetFromHeader } = this;
      if (header && fixedHeader) {
        return {
          top: `${offsetFromHeader}px`
        };
      }
      return {};
    }
  }
};
</script>
<style scoped lang="scss">
.table-cell {
  display: flex;
  border-bottom: 1px solid $grey-color;
  min-width: 41px;
  min-height: 47px;
  box-sizing: border-box;
  background-color: $white-background-color;
  &.col-type-index,
  &.col-type-text {
    .cell-content {
      padding: 15px;
      font-size: 16px;
      line-height: 16px;
      box-sizing: border-box;
    }
  }
  &.col-type-text {
    .cell-content {
      color: $black-font-color;
      min-width: 100px;
      max-width: 250px;
      @include truncate-text;
    }
  }
  &.header {
    min-height: 41px;
    &.fixedHeader {
      z-index: 1;
      position: sticky;
      top: 0;
    }
    .cell-content {
      padding: 14px 12px 12px 15px;
      font-size: 14px;
      font-weight: 600;
      color: $dark-grey-font-color;
      @include truncate-text;
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
  &.activeSort {
    &.header {
      .cell-content {
        color: $primary-font-color;
      }
    }
    &.sort {
      .cell-sort {
        /deep/ .material-design-icon {
          color: $primary-font-color;
        }
      }
    }
  }
}
</style>
