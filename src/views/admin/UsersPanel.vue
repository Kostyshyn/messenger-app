<template>
  <div>
    <h1>Users</h1>
    <UsersTable
      :users="users"
      @sortUsers="sortUsers"
      @searchUsers="keyword = $event"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import UsersTable from '@/components/General/Admin/UsersTable.vue';
import api from '@/services/api';

export default {
  name: 'UsersPanel',
  components: {
    UsersTable
  },
  data() {
    return {
      users: {
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
    async getUsers(params = {}) {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        this.users = await api.getUsersData(params);
        this.requestProcessing = false;
      } catch (err) {
        this.requestProcessing = false;
        console.log(err);
      }
    },
    sortUsers({ key, value }) {
      this.sort = { [key]: value };
    }
  },
  watch: {
    query: {
      deep: true,
      immediate: true,
      handler(data) {
        this.getUsers(data);
      }
    }
  },
  created() {}
};
</script>
