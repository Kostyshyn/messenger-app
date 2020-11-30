<template>
  <div
    class="table-wrapper"
    :class="[className]"
    :style="tableStyle"
    ref="tableWrapper"
  >
    <div class="table-header" :style="tableSlotsStyle">
      <slot name="header" />
    </div>
    <div class="table">
      <Column v-if="index" className="index">
        <Cell header :fixedHeader="fixedHeader">#</Cell>
        <Cell v-for="(cell, i) in data" type="index" :key="i">{{ i + 1 }}</Cell>
      </Column>
      <Column v-for="(col, i) in columns" :className="col.key" :key="i">
        <Cell
          header
          :fixedHeader="fixedHeader"
          :sort="col.sort"
          :activeSort="activeSort(col)"
          :sortValue="sortValue(col)"
          :sortValues="sortValues"
          @click.native="clickCell(col)"
        >
          {{ col.label || '' }}
        </Cell>
        <Cell v-for="(cell, i) in data" :type="col.type" :key="i">
          <slot :name="col.key" :col="col" :cell="cell" :index="i" />
          <template v-if="!$scopedSlots[col.key]">
            <slot name="cell" :col="col" :cell="cell" :index="i" />
            <template v-if="!$scopedSlots.cell">
              {{ cell[col.key] }}
            </template>
          </template>
        </Cell>
      </Column>
    </div>
    <div class="table-footer" :style="tableSlotsStyle">
      <slot name="footer" />
    </div>
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
    width: {
      type: String,
      default: 'auto'
    },
    className: {
      type: String,
      default: ''
    },
    index: {
      type: Boolean,
      default: false
    },
    fixedHeader: {
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
      sortValues: SORT_VALUES,
      tableWidth: 0
    };
  },
  computed: {
    tableStyle() {
      const { width } = this;
      return { width };
    },
    tableSlotsStyle() {
      const { tableWidth } = this;
      return {
        'max-width': Math.floor(tableWidth) + 'px'
      };
    }
  },
  methods: {
    activeSort(col) {
      return this.currentSort.key === col.key;
    },
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
    },
    setSlotsWidth() {
      const { tableWrapper } = this.$refs;
      if (tableWrapper) {
        const { clientWidth } = tableWrapper;
        this.tableWidth = clientWidth - 1;
      }
    }
  },
  mounted() {
    this.setSlotsWidth();
  }
};
</script>
<style scoped lang="scss">
.table-wrapper {
  overflow: auto;
  box-shadow: $block-shadow;
  max-width: 100%;
  max-height: 100%;
  display: grid;
  .table-header,
  .table-footer {
    width: 100%;
    position: sticky;
    left: 0;
  }
  .table {
    display: flex;
    background-color: $white-background-color;
  }
}
</style>
