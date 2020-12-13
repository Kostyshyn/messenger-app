<template>
  <div class="request-info-wrapper">
    <h1>Request: {{ request.url }}</h1>
    <ul>
      <li>
        Original url <b>{{ request.originalUrl }}</b>
      </li>
      <li>
        IP address <b>{{ request.ip }}</b>
      </li>
    </ul>
    <div class="request-origins-table-wrapper">
      <Table
        index
        width="fit-content"
        :fullPage="false"
        :data="requestOrigins"
        :columns="requestOriginsColumns"
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
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/General/Helpers/Table/Table.vue';
import { mapGetters, mapActions } from 'vuex';
import api from '@/services/api';

export default {
  name: 'RequestInfo',
  components: {
    Table
  },
  data() {
    return {
      request: {},
      meta: {},
      requestProcessing: false,
      requestOriginsColumns: [
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
          label: 'Total',
          key: 'total'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    }),
    requestOrigins() {
      const { perOrigin } = this.meta;
      if (perOrigin) {
        return perOrigin.map(stat => {
          return {
            ...stat,
            origin: stat._id.origin.name,
            isDefault: stat._id.origin.isDefault
          };
        });
      }
      return [];
    }
  },
  methods: {
    ...mapActions({}),
    async getRequest(id) {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        const { requestLog, meta } = await api.getRequest(id);
        this.request = requestLog;
        this.meta = meta;
      } catch (err) {
        console.log(err);
      } finally {
        this.requestProcessing = false;
      }
    }
  },
  filters: {
    roundMs(value) {
      return Math.round(value);
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler: 'getRequest'
    }
  },
  created() {}
};
</script>
<style scoped lang="scss">
.request-info-wrapper {
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
}
</style>
