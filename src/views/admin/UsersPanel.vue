<template>
  <div>
    <h1>Users</h1>
    <UsersTable :users="users" />
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
      keywords: ''
    };
  },
  computed: {
    query() {
      const { page, limit, sort, keywords } = this;
      return { page, limit, sort, keywords };
    }
  },
  methods: {
    async getUsers() {
      if (this.requestProcessing) {
        return;
      }
      try {
        this.requestProcessing = true;
        this.users = await api.getUsersData(this.query);
        this.requestProcessing = false;
      } catch (err) {
        this.requestProcessing = false;
        console.log(err);
      }
    }
  },
  created() {
    this.getUsers();
  }
};
</script>
