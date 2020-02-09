<template>
  <div class="chats main-wrapper">
    <ul v-if="users && users.length" class="chats-list">
      <li v-for="(user, index) in users" :key="index">
        <router-link :to="chatUrl(user)">{{ user.username }}</router-link>
      </li>
    </ul>
    <div v-if="user" class="chat-view">
      <img class="image" :src="baseUrl + '/' + user.profile_img" alt="" />
      <h1>Active: {{ user.username }}</h1>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
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
    ...mapGetters({
      baseUrl: 'app/baseUrl'
    }),
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
<style lang="scss" scoped>
.chats {
  display: flex;
  flex-direction: row;
  .chats-list {
    display: inline-block;
    width: 200px;
    li {
      a {
        display: inline-block;
        width: 100%;
        padding: 12px 10px;
        cursor: pointer;
        height: 40px;
        border: 1px solid rgb(193, 193, 193);
        border-bottom: none;
        box-sizing: border-box;
      }
      &:last-child {
        a {
          border-bottom: 1px solid rgb(193, 193, 193);
        }
      }
    }
  }
  .chat-view {
    display: inline-block;
    width: calc(100% - 200px);
    padding: 10px;
    border: 1px solid rgb(193, 193, 193);
    box-sizing: border-box;
    border-left: none;
    .image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
}
</style>
