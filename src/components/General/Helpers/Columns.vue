<template>
  <div class="row" :class="className">
    <div
      v-for="(col, i) in columns"
      class="col"
      :class="colClass(i)"
      :style="colStyle"
      :key="i"
    >
      <slot name="column" :col="col" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';

export default {
  name: 'Columns',
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columnsNum: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    },
    colMaxWidth: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      device: 'app/device'
    }),
    hasColumns() {
      return this.columnsNum > 1;
    },
    columns() {
      const { columnsNum, data, _ } = this;
      return _.chunk(data, _.round(data.length / columnsNum));
    },
    colStyle() {
      const { colMaxWidth } = this;
      if (this.device === 'sm') {
        return { maxWidth: '100%', width: '100%' };
      }
      return {
        maxWidth: colMaxWidth,
        width: 100 / this.columnsNum + '%'
      };
    }
  },
  methods: {
    colClass(index) {
      const num = index + 1;
      return [`col-num-${num}`, num % 2 === 0 ? 'even' : 'odd'];
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: center;
  flex-direction: row;
  .col {
    padding: 0 10px;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }
}
@media (max-width: $sm) {
  .row {
    flex-direction: column;
    .col {
      max-width: 100%;
      padding: 0;
    }
  }
}
</style>
