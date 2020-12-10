<template>
  <div
    class="table-wrapper"
    :class="[className]"
    :style="tableStyle"
    ref="tableWrapper"
  >
    <transition name="fade" mode="out-in">
      <div v-if="requestProcessing" class="table-overlay" :style="overlayStyle">
        <Loader loading />
      </div>
    </transition>
    <div class="table-header" :style="tableSlotsStyle" ref="tableHeader">
      <slot name="header" />
    </div>
    <div
      class="scroll-table"
      :class="{ requestProcessing }"
      :style="tableScrollStyle"
      ref="scrollTable"
    >
      <div class="table">
        <Column v-if="index" className="index">
          <Cell header :fixedHeader="fixedHeader">
            #
          </Cell>
          <Cell v-for="(cell, i) in data" type="index" :key="i">
            {{ i + 1 }}
          </Cell>
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
    </div>
    <div class="table-footer" :style="tableSlotsStyle" ref="tableFooter">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Column from '@/components/General/Helpers/Table/Column.vue';
import Cell from '@/components/General/Helpers/Table/Cell.vue';
import Loader from '@/components/General/Helpers/Loader.vue';

const SORT_VALUES = ['asc', 'desc'];
const DEF_SORT_VALUE = 'asc';

export default {
  name: 'Table',
  components: {
    Column,
    Cell,
    Loader
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
    },
    requestProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentSort: {
        key: '',
        value: ''
      },
      sortValues: SORT_VALUES,
      tableWidth: 0,
      offsetBottom: 20,
      maxHeight: 0,
      offsetFromHeader: 0,
      offsetFromFooter: 0
    };
  },
  computed: {
    tableStyle() {
      const { width, maxHeight } = this;
      return {
        width,
        maxHeight: `calc(100vh - ${maxHeight}px)`,
        height: `calc(100vh - ${maxHeight}px)`
      };
    },
    tableSlotsStyle() {
      return {};
    },
    tableScrollStyle() {
      const {
        offsetFromHeader: top,
        offsetFromFooter: bottom,
        maxHeight
      } = this;
      return {
        top: `${top}px`,
        height: `calc(100vh - ${maxHeight + top + bottom}px)`
      };
    },
    overlayStyle() {
      return this.tableScrollStyle;
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
        this.scrollToTop();
        this.$emit('sort', this.currentSort);
      }
      this.$emit('click', col);
    },
    switchSort(value) {
      return SORT_VALUES.filter(v => v !== value)[0];
    },
    scrollToTop() {
      const { scrollTable } = this.$refs;
      if (scrollTable) {
        scrollTable.scrollTop = 0;
      }
    },
    setMaxHeight() {
      const { tableWrapper } = this.$refs;
      if (tableWrapper) {
        const { top } = tableWrapper.getBoundingClientRect();
        const { offsetBottom } = this;
        this.maxHeight = top + offsetBottom;
      }
    },
    setOffsets() {
      const { tableHeader, tableFooter } = this.$refs;
      if (tableHeader) {
        this.offsetFromHeader = tableHeader.offsetHeight;
      }
      if (tableFooter) {
        this.offsetFromFooter = tableFooter.offsetHeight;
      }
    },
    setSlotsWidth() {
      const { tableWrapper } = this.$refs;
      if (tableWrapper) {
        const { offsetWidth } = tableWrapper;
        this.tableWidth = offsetWidth - 1;
      }
    }
  },
  watch: {
    requestProcessing() {
      this.setSlotsWidth();
    }
  },
  mounted() {
    this.setMaxHeight();
    this.setOffsets();
    this.setSlotsWidth();
  }
};
</script>
<style scoped lang="scss">
.table-wrapper {
  box-shadow: $block-shadow;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  position: relative;
  .table-header,
  .table-footer {
    width: 100%;
    left: 0;
    background-color: $pure-white-background-color;
    z-index: 1;
  }
  .table-header {
    position: sticky;
    top: 0;
  }
  .table-footer {
    position: absolute;
    bottom: 0;
  }
  .scroll-table {
    overflow: auto;
    &.requestProcessing {
      overflow: hidden;
    }
    .table {
      display: flex;
      background-color: $white-background-color;
    }
  }
  .table-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: $white-background-color-transparent;
    /deep/.circle-preloader {
      border-bottom-color: $primary-color;
    }
  }
}
</style>
