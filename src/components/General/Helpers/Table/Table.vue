<template>
  <div class="table">
    <Column v-if="index">
      <Cell header>#</Cell>
      <Cell v-for="(cell, i) in data" :key="i">{{ i + 1 }}</Cell>
    </Column>
    <Column v-for="(col, i) in columns" :key="i">
      <Cell header :sort="col.sort" @click.native="clickCell(col)">
        {{ col.label }}
      </Cell>
      <Cell v-for="(cell, i) in data" :key="i">
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

export default {
  name: 'Table',
  components: {
    Column,
    Cell
  },
  props: {
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
      }
    };
  },
  methods: {
    clickCell(col) {
      if (col.sort) {
        this.$emit('sort', {
          key: col.key,
          value: ''
        });
      }
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.table {
  display: flex;
}
</style>
