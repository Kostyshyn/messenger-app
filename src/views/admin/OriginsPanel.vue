<template>
  <div>
    <h1>Origins</h1>
    <OriginsTable :origins="origins" />
  </div>
</template>

<script>
// @ is an alias to /src
import OriginsTable from '@/components/General/Admin/OriginsTable.vue';

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
  }
};
</script>
