<template>
  <div class="table" :class="[className]">
    <Column v-if="index">
      <Cell header>#</Cell>
      <Cell v-for="(cell, i) in data" :key="i">{{ i + 1 }}</Cell>
    </Column>
    <Column v-for="(col, i) in columns" :key="i">
      <Cell
        header
        :sort="col.sort"
        :sortValue="sortValue(col)"
        :sortValues="sortValues"
        @click.native="clickCell(col)"
      >
        {{ col.label }}
      </Cell>
      <Cell v-for="(cell, i) in data" :resetStyles="col.resetStyles" :key="i">
        <slot :name="col.key" :col="col" :cell="cell" :index="i" />
        <template v-if="!$scopedSlots[col.key]">
          {{ cell[col.key] }}
        </template>
      </Cell>
    </Column>
  </div>
</template>

<script>
// @ is an alias to /src
import Column from '@/components/General/Helpers/Table/Column.vue';
import Cell from '@/components/General/Helpers/Table/Cell.vue';

const SORT_VALUES = ['asc', 'desc'];
const DEF_SORT_VALUE = 'asc';

export default {
  name: 'Table',
  components: {
    Column,
    Cell
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    index: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentSort: {
        key: '',
        value: ''
      },
      sortValues: SORT_VALUES
    };
  },
  methods: {
    sortValue(col) {
      const { currentSort } = this;
      if (currentSort.key === col.key) {
        return currentSort.value;
      }
      return DEF_SORT_VALUE;
    },
    clickCell(col) {
      if (col.sort) {
        const { currentSort, switchSort } = this;
        if (currentSort.key === col.key) {
          this.currentSort.value = switchSort(currentSort.value);
        } else {
          this.currentSort = {
            key: col.key,
            value: switchSort(DEF_SORT_VALUE)
          };
        }
        this.$emit('sort', this.currentSort);
      }
      this.$emit('click', col);
    },
    switchSort(value) {
      return SORT_VALUES.filter(v => v !== value)[0];
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.table {
  display: flex;
  width: fit-content;
  box-shadow: $block-shadow;
  background-color: $white-background-color;
}
</style>
