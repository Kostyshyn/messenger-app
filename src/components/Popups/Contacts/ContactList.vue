<template>
  <div class="contact-list">
    <div class="contact-search">
      <SearchField v-model="keyword" />
    </div>
    <UserList :list="users.data" />
    <div class="contact-footer">
      <Button className="close" color="transparent" ripple>
        Add
      </Button>
      <Button className="close" color="transparent" ripple @click="close">
        Close
      </Button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchField from '@/components/General/Form/SearchField.vue';
import Button from '@/components/General/Helpers/Button.vue';
import UserList from '@/components/General/List/UserList.vue';
import { mapActions } from 'vuex';
import api from '@/services/api';
import debounce from '@/utils/debounce';

export default {
  name: 'ContactList',
  components: {
    SearchField,
    Button,
    UserList
  },
  props: {
    contacts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      title: 'Contacts',
      users: {},
      page: 1,
      keyword: '',
      delay: 200, // debounce ms
      requestProcessing: false,
      debouncedGetUsers: null
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      close: 'popup/closePopup'
    }),
    async getContacts() {
      try {
        const { keyword, page } = this;
        this.requestProcessing = true;
        this.users = await api.getContacts({
          page,
          limit: 10, // for testing
          keyword
        });
        this.requestProcessing = false;
      } catch (err) {
        this.requestProcessing = false;
        console.log(err);
      }
    }
  },
  watch: {
    keyword() {
      this.debouncedGetUsers();
    }
  },
  mounted() {},
  created() {
    this.getContacts();
    this.debouncedGetUsers = debounce(this.getContacts, this.delay);
  }
};
</script>
<style lang="scss" scoped>
.contact-list {
  height: 400px;
  display: flex;
  flex-direction: column;
  .contact-search {
    padding: 0 15px;
  }
  /deep/ .list {
    .user-list-item {
      padding: 8px 15px;
    }
  }
  .contact-footer {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15px 5px 15px;
  }
  @media (max-width: $sm) {
    height: calc(100% - 53px);
    .contact-footer {
      padding-bottom: 15px;
    }
  }
}
</style>
