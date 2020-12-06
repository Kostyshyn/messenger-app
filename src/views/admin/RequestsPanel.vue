<template>
  <div>
    <h1>Requests</h1>
    <RequestsTable
      :requests="requests"
      @sortRequests="sortRequests"
      @searchRequests="keyword = $event"
      @updateRequests="getRequests"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import RequestsTable from '@/components/General/Admin/Tables/RequestsTable.vue';
import api from '@/services/api';

export default {
  name: 'RequestsPanel',
  components: {
    RequestsTable
  },
  data() {
    return {
      requests: {
        data: []
      },
      requestProcessing: false,
      page: 1,
      limit: 50,
      sort: {},
      keyword: ''
    };
  },
  computed: {
    query() {
      const { page, limit, sort, keyword } = this;
      return { page, limit, sort, keyword };
    }
  },
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
    sortRequests({ key, value }) {
      this.sort = { [key]: value };
    }
  },
  watch: {
    query: {
      deep: true,
      immediate: true,
      handler(data) {
        this.getRequests(data);
      }
    }
  }
};
</script>
