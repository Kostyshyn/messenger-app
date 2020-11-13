<template>
  <div class="table-cell" :class="[{ header, sort }]">
    <div class="cell-content">
      <slot />
    </div>
    <div v-if="header && sort" class="cell-sort">
      <MenuDown v-if="sortValue === 'asc'" />
      <MenuUp v-if="sortValue === 'desc'" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuUp from 'vue-material-design-icons/MenuUp.vue';
import MenuDown from 'vue-material-design-icons/MenuDown.vue';

const SORT_VALUES = ['asc', 'desc'];

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
    sort: {
      type: Boolean,
      default: false
    },
    sortValue: {
      type: String,
      validator: type => {
        return SORT_VALUES.includes(type);
      },
      default: 'asc'
    }
  }
};
</script>
<style scoped lang="scss">
.table-cell {
  display: flex;
  border: 1px solid grey;
  min-width: 38px;
  min-height: 38px;
  box-sizing: border-box;
  .cell-content {
    padding: 10px;
  }
  &.header {
    font-weight: 600;
  }
  &.sort {
    cursor: pointer;
    &:hover {
      background-color: #c1c1c1;
    }
    .cell-sort {
      display: flex;
      height: 100%;
      align-items: center;
    }
  }
}
</style>
