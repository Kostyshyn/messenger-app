<template>
  <div>
    <h1>Origins</h1>
    <OriginsTable
      :origins="origins"
      :requestProcessing="requestProcessing"
      @sortOrigins="sortItems"
      @searchOrigins="searchItems"
      @updateOrigins="getOrigins"
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
      requestProcessing: false
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
    }
  },
  watch: {
    query: {
      deep: true,
      handler(data) {
        this.setQuery(data);
        this.getOrigins(data);
      }
    }
  },
  mounted() {
    this.getOrigins(this.query);
  }
};
</script>
