<template>
  <div>
    <h1>Requests</h1>
    <RequestsTable
      :requests="requests"
      :requestProcessing="requestProcessing"
      @sortRequests="sortItems"
      @searchRequests="searchItems"
      @updateRequests="getRequests"
      @pageChange="page = $event"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import RequestsTable from '@/components/General/Admin/Tables/RequestsTable.vue';
import api from '@/services/api';
import panel from '@/mixins/panel';

export default {
  name: 'RequestsPanel',
  components: {
    RequestsTable
  },
  mixins: [panel],
  data() {
    return {
      requests: {
        data: []
      },
      requestProcessing: false,
      intervalDelay: 5000,
      intervalId: null
    };
  },
  computed: {},
  methods: {
    async getRequests(params = {}) {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        this.requests = await api.getRequestsData(params);
      } catch (err) {
        console.log(err);
      } finally {
        this.requestProcessing = false;
      }
    },
    startPoll() {
      this.intervalId = setInterval(() => {
        this.getRequests(this.query);
      }, this.intervalDelay);
    }
  },
  watch: {
    query: {
      deep: true,
      handler(data) {
        this.setQuery(data);
        this.getRequests(data);
      }
    }
  },
  mounted() {
    this.getRequests(this.query);
  },
  created() {
    // this.startPoll();
  },
  beforeDestroy() {
    // clearInterval(this.intervalId);
  }
};
</script>
