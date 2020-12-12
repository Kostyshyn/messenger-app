<template>
  <List :heading="heading">
    <UserListItem
      v-for="(user, index) in list"
      :user="user"
      className="user-list-item"
      :key="index"
    />
  </List>
</template>

<script>
// @ is an alias to /src
import List from '@/components/General/List/List.vue';
import UserListItem from '@/components/General/List/UserListItem.vue';

export default {
  name: 'UserList',
  components: {
    List,
    UserListItem
  },
  props: {
    className: {
      type: [String, Array]
    },
    list: {
      type: Array,
      default: () => []
    },
    heading: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped></style>
