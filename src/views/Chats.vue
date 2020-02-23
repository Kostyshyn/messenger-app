<template>
  <div class="chats main-wrapper">
    <div class="chats-list">
      <ul v-if="users.data && users.data.length">
        <li v-for="(user, index) in users.data" :key="index">
          <router-link :to="chatUrl(user)">{{ user.username }}</router-link>
        </li>
      </ul>
      <div v-if="users.data" class="pagination">
        <button v-if="users.prevPage" @click="changePage(users.prevPage)">
          &larr;
        </button>
        <button
          v-for="(page, index) in users.totalPages"
          :class="{ active: users.page === page }"
          @click="changePage(page)"
          :key="index"
        >
          {{ page }}
        </button>
        <button v-if="users.nextPage" @click="changePage(users.nextPage)">
          &rarr;
        </button>
      </div>
    </div>
    <div v-if="user" class="chat-view">
      <img class="image" :src="baseUrl + '/' + user.profile_image.url" alt="" />
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
      users: {},
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
        const page = this.users.page || 1;
        this.users = await api.getUsers({
          page,
          limit: 5 // for testing
        });
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
    changePage(page) {
      this.users.page = page;
      this.getUsers();
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
    .pagination {
      button {
        &.active {
          color: red;
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
