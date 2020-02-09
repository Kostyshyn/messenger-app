<template>
  <div class="chats">
    <h1>
      Chats
    </h1>
    <ul v-if="users && users.length" class="chats-list">
      <li v-for="(user, index) in users" :key="index">
        <router-link :to="chatUrl(user)">{{ user.username }}</router-link>
      </li>
    </ul>
    <div v-if="user" class="chat-view">
      <h3>Active user</h3>
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/services/api';

export default {
  name: 'Chats',
  components: {},
  data() {
    return {
      users: [],
      user: null
    };
  },
  computed: {
    url() {
      return this.$route.params.url;
    }
  },
  methods: {
    async getUsers() {
      try {
        this.users = await api.getUsers();
      } catch (err) {
        console.log(err);
      }
    },
    async getUser() {
      try {
        if (this.url) {
          this.user = await api.getUserByUrl(this.url);
        } else {
          this.user = null;
        }
      } catch (err) {
        if (err.status === 404) {
          this.$router.push('/chats');
        }
        this.user = null;
      }
    },
    chatUrl(item) {
      return { name: 'Chats', params: { url: item.url } };
    }
  },
  watch: {
    url() {
      this.getUser();
    }
  },
  created() {
    this.getUsers();
    this.getUser();
  }
};
</script>
