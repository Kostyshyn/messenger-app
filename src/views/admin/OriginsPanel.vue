<template>
  <div>
    <h1>Origins</h1>
    <OriginsTable
      :origins="origins"
      @sortOrigins="sortOrigins"
      @searchOrigins="keyword = $event"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import OriginsTable from '@/components/General/Admin/Tables/OriginsTable.vue';
import api from '@/services/api';

export default {
  name: 'OriginsPanel',
  components: {
    OriginsTable
  },
  data() {
    return {
      origins: {
        data: []
      },
      requestProcessing: false,
      page: 1,
      limit: 10,
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
    async getOrigins(params = {}) {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        this.origins = await api.getOriginsData(params);
        this.requestProcessing = false;
      } catch (err) {
        this.requestProcessing = false;
        console.log(err);
      }
    },
    sortOrigins({ key, value }) {
      this.sort = { [key]: value };
    }
  },
  watch: {
    query: {
      deep: true,
      immediate: true,
      handler(data) {
        this.getOrigins(data);
      }
    }
  }
};
</script>
