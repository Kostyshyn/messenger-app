<template>
  <div>
    <h1>Origins</h1>
    <OriginsTable
      :origins="origins"
      :keyword="keyword"
      :sort="sort"
      :requestProcessing="requestProcessing"
      @sortOrigins="sortItems"
      @searchOrigins="searchItems"
      @updateOrigins="updateOrigins"
      @pageChange="page = $event"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import OriginsTable from '@/components/General/Admin/Tables/OriginsTable.vue';
import api from '@/services/api';
import panel from '@/mixins/panel';

export default {
  name: 'OriginsPanel',
  components: {
    OriginsTable
  },
  mixins: [panel],
  data() {
    return {
      origins: {
        data: []
      },
      requestProcessing: false,
      // override request options
      limit: 10
    };
  },
  computed: {},
  methods: {
    async getOrigins(params = {}) {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        this.origins = await api.getOriginsData(params);
      } catch (err) {
        console.log(err);
      } finally {
        this.requestProcessing = false;
      }
    },
    updateOrigins() {
      this.resetItems({ limit: 10 });
    }
  },
  watch: {
    query: {
      deep: true,
      immediate: true,
      handler(data) {
        this.setQuery(data);
        this.getOrigins(data);
      }
    }
  },
  mounted() {}
};
</script>
