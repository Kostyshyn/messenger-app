<template>
  <div>
    <h1>Users</h1>
    <UsersTable
      :users="users"
      :keyword="keyword"
      :sort="sort"
      :requestProcessing="requestProcessing"
      @sortUsers="sortItems"
      @searchUsers="searchItems"
      @pageChange="page = $event"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import UsersTable from '@/components/General/Admin/Tables/UsersTable.vue';
import api from '@/services/api';
import panel from '@/mixins/panel';

export default {
  name: 'UsersPanel',
  components: {
    UsersTable
  },
  mixins: [panel],
  data() {
    return {
      users: {
        data: []
      },
      requestProcessing: false,
      // override request options
      limit: 10
    };
  },
  computed: {},
  methods: {
    async getUsers(params = {}) {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        this.users = await api.getUsersData(params);
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
      immediate: true,
      handler(data) {
        this.setQuery(data);
        this.getUsers(data);
      }
    }
  },
  created() {}
};
</script>
