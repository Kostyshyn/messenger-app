<template>
  <div class="contact-list">
    <SearchField v-model="keyword" />
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
import SearchField from '@/components/Helpers/SearchField.vue';
import Button from '@/components/Helpers/Button.vue';
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
      keyword: '',
      delay: 200, // debounce ms
      requestProcessing: false,
      debouncedGetUsers: null
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      close: 'app/closePopup'
    }),
    async getUsers() {
      try {
        const { keyword } = this;
        const page = this.users.page || 1;
        this.requestProcessing = true;
        this.users = await api.getUsers({
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
    this.getUsers();
    this.debouncedGetUsers = debounce(this.getUsers, this.delay);
  }
};
</script>
<style lang="scss" scoped>
.contact-list {
  height: 400px;
  padding: 0px 15px 5px 15px;
  display: flex;
  flex-direction: column;
  .contact-footer {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
