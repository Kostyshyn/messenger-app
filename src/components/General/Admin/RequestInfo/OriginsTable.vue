<template>
  <div class="request-origins-table-wrapper">
    <Table
      index
      width="fit-content"
      :fullPage="false"
      :data="origins"
      :columns="columns"
      className="request-origins-table"
    >
      <template #cell="{ col, cell }">
        <template v-if="col.type === 'time'">
          {{ cell[col.key] | roundMs }} ms
        </template>
        <template v-else>
          {{ cell[col.key] }}
        </template>
      </template>
      <template #origin="{ col, cell }">
        <span :class="{ default: cell.isDefault }">
          {{ cell[col.key] }}
        </span>
      </template>
    </Table>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/General/Helpers/Table/Table.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'OriginsTable',
  components: {
    Table
  },
  props: {
    origins: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      columns: [
        {
          label: 'Origin',
          key: 'origin'
        },
        {
          label: 'Response time (avg.)',
          key: 'avg',
          type: 'time'
        },
        {
          label: 'Min',
          key: 'min',
          type: 'time'
        },
        {
          label: 'Max',
          key: 'max',
          type: 'time'
        },
        {
          label: 'Requests',
          key: 'total'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    })
  },
  methods: {
    ...mapActions({})
  },
  filters: {
    roundMs(value) {
      return Math.round(value);
    }
  },
  watch: {},
  created() {}
};
</script>
<style scoped lang="scss">
.request-origins-table-wrapper {
  padding: 20px 0;

  /deep/ .col-type-time {
    padding: 15px;
    font-size: 16px;
    line-height: 16px;
    box-sizing: border-box;

    .cell-content {
      color: $black-font-color;
      min-width: 100px;
      max-width: 250px;
      @include truncate-text;
    }
  }
}
</style>
