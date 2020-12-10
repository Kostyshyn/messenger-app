<template>
  <div class="requests-table-wrapper">
    <Table
      index
      fixedHeader
      :data="requests.data"
      :columns="columns"
      :requestProcessing="requestProcessing"
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
      <template #url="{ col, cell }">
        <router-link :to="requestUrl(cell)" class="request-link">
          {{ cell[col.key] }}
        </router-link>
      </template>
      <template #method="{ cell }">
        <Chip flat v-bind="methodStyle(cell)" />
      </template>
      <template #statusCode="{ col, cell }">
        <span class="status-code" :class="statusCodeClass(cell)">
          {{ cell[col.key] }}
        </span>
      </template>
      <template #responseTime="{ col, cell }">
        <span class="status-code" :class="responseTimeClass(cell)">
          {{ cell[col.key] }} ms
        </span>
      </template>
      <template #origin="{ col, cell }">
        <span :class="{ bold: cell[col.key].isDefault }">
          {{ cell[col.key].name }}
        </span>
      </template>
      <template #options="{ cell }">
        <TableOptions :options="options" @action="action($event, cell)" />
      </template>
      <template #footer>
        <TablePagination
          :requestProcessing="requestProcessing"
          :pagination="requests"
          @pageChange="$emit('pageChange', $event)"
        />
      </template>
    </Table>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/General/Helpers/Table/Table.vue';
import TablePagination from '@/components/General/Helpers/Table/TablePagination.vue';
import SearchField from '@/components/General/Form/SearchField.vue';
import Chip from '@/components/General/Helpers/Chip.vue';
import TableOptions from '@/components/General/Admin/Tables/TableOptions.vue';
import { mapActions, mapGetters } from 'vuex';
import debounce from '@/utils/debounce';
import { percentage } from '@/utils/math';

export default {
  name: 'RequestsTable',
  components: {
    Table,
    TablePagination,
    SearchField,
    Chip,
    TableOptions
  },
  props: {
    requests: {
      type: Object,
      default: () => {}
    },
    requestProcessing: {
      type: Boolean,
      default: false
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
          type: 'method',
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
      options: [],
      methodsHash: {
        GET: {
          label: 'GET',
          color: 'success'
        },
        POST: {
          label: 'POST',
          color: 'warning'
        },
        PUT: {
          label: 'PUT',
          color: 'primary'
        },
        DELETE: {
          label: 'DELETE',
          color: 'error'
        }
      }
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
    },
    requestUrl({ _id }) {
      return `/admin-panel/requests/${_id}`;
    },
    methodStyle({ method }) {
      const { methodsHash } = this;
      if (methodsHash[method]) {
        return methodsHash[method];
      }
      return {};
    },
    statusCodeClass({ statusCode }) {
      const color =
        statusCode >= 500
          ? 'text-error'
          : statusCode >= 400
          ? 'text-warning'
          : statusCode >= 300
          ? 'text-primary'
          : statusCode >= 200
          ? 'text-success'
          : 0;
      return [color];
    },
    responseTimeClass({ url, method, responseTime }) {
      const { meta } = this.requests;
      const requestMeta = meta.find(({ _id }) => {
        return _id.url === url && _id.method === method;
      });
      if (requestMeta) {
        const per = percentage(responseTime, requestMeta['responseTime']);
        const color =
          per >= 200
            ? 'text-error'
            : per >= 110
            ? 'text-warning'
            : 'text-success';
        return [color];
      }
      return [];
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
      .bold {
        font-weight: 600;
      }
      .request-link {
        font-size: 16px;
        font-weight: 400;
        color: $light-primary-color;
        text-decoration: none;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        &:hover {
          color: $primary-color;
        }
      }
    }
    /deep/ .method {
      .col-type-method {
        .cell-content {
          display: flex;
          align-items: center;
          padding: 0 15px;
          width: 100%;
        }
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
