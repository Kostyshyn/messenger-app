<template>
  <div class="requests-table-wrapper">
    <Table
      index
      fixedHeader
      :data="requests.data"
      :columns="columns"
      className="requests-table"
      @sort="$emit('sortRequests', $event)"
    >
      <template #header>
        <div class="requests-table-header">
          <div class="search-requests">
            <SearchField placeholder="Search requests" v-model="keyword" />
          </div>
        </div>
      </template>
      <template #cell="{ col, cell }">
        <template v-if="col.type === 'date'">
          {{ cell[col.key] | moment('D.MM.YY, H:mm') }}
        </template>
        <template v-else>
          {{ cell[col.key] }}
        </template>
      </template>
      <template #origin="{ col, cell }">
        <span :class="{ default: cell[col.key].isDefault }">
          {{ cell[col.key].name }}
        </span>
      </template>
      <template #options="{ cell }">
        <TableOptions :options="options" @action="action($event, cell)" />
      </template>
    </Table>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/General/Helpers/Table/Table.vue';
import SearchField from '@/components/General/Form/SearchField.vue';
import TableOptions from '@/components/General/Admin/Tables/TableOptions.vue';
import { mapActions, mapGetters } from 'vuex';
import debounce from '@/utils/debounce';

export default {
  name: 'RequestsTable',
  components: {
    Table,
    SearchField,
    TableOptions
  },
  props: {
    requests: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columns: [
        {
          label: 'Url',
          key: 'url',
          sort: true
        },
        {
          label: 'Method',
          key: 'method',
          sort: true
        },
        {
          label: 'Status code',
          key: 'statusCode',
          sort: true
        },
        {
          label: 'Response time',
          key: 'responseTime',
          sort: true
        },
        {
          label: 'Origin',
          key: 'origin',
          sort: true
        },
        {
          label: 'Created at',
          key: 'createdAt',
          sort: true,
          type: 'date'
        },
        {
          key: 'options',
          type: 'options'
        }
      ],
      keyword: '',
      delay: 200,
      options: []
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      openPopup: 'popup/openPopup'
    }),
    searchRequests() {
      this.$emit('searchRequests', this.keyword);
    },
    action({ type }, request) {
      if (type && this[type]) {
        this[type](request);
      }
    }
  },
  watch: {
    keyword() {
      this.debouncedSearchRequests();
    }
  },
  created() {
    this.debouncedSearchRequests = debounce(this.searchRequests, this.delay);
  }
};
</script>
<style scoped lang="scss">
.requests-table-wrapper {
  .requests-table {
    .requests-table-header {
      display: flex;
      justify-content: space-between;
      .search-requests {
        padding: 15px 15px 0 15px;
        width: 300px;
        box-sizing: border-box;
        @media (max-width: $md) {
          width: 100%;
        }
      }
    }
    /deep/ .col-type-text {
      .default {
        font-weight: 600;
      }
    }
    /deep/ .options {
      max-width: fit-content;
      .col-type-options {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 5px;
      }
    }
    /deep/ .col-type-date {
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
}
</style>
