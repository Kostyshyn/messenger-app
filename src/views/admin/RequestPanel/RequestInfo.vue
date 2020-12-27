<template>
  <div class="request-info-wrapper">
    <template v-if="!requestProcessing">
      <h1>
        Request: {{ request.url }}
        <MethodChip :method="request.method" />
      </h1>
      <ul>
        <li>
          Original url <b>{{ request.originalUrl }}</b>
        </li>
        <li>
          IP address <b>{{ request.ip }}</b>
        </li>
      </ul>
      <DayChart :chartData="meta.perDay" />
      <HourChart :chartData="meta.perHour" />
      <OriginsTable :origins="requestOrigins" />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import api from '@/services/api';
import MethodChip from '@/components/General/Admin/Panels/Requests/MethodChip.vue';
import DayChart from '@/components/General/Admin/RequestInfo/DayChart.vue';
import HourChart from '@/components/General/Admin/RequestInfo/HourChart';
import OriginsTable from '@/components/General/Admin/RequestInfo/OriginsTable.vue';

export default {
  name: 'RequestInfo',
  components: {
    MethodChip,
    DayChart,
    HourChart,
    OriginsTable
  },
  data() {
    return {
      request: {},
      meta: {
        perDay: [],
        perHour: [],
        perOrigin: []
      },
      requestProcessing: false
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
  watch: {
    '$route.params.id': {
      immediate: true,
      handler: 'getRequest'
    }
  },
  created() {}
};
</script>
<style scoped lang="scss"></style>
