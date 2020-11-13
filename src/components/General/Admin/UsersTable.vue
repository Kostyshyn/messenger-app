<template>
  <Table index :data="users.data" :columns="columns">
    <template #age="{ col, cell }">
      This is {{ col.key }} / {{ cell[col.key] }}
    </template>
    <template #id="{ col, cell }">
      SLOT {{ col.key }} / {{ cell[col.key] }}
    </template>
  </Table>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/General/Helpers/Table/Table.vue';

export default {
  name: 'UsersTable',
  components: {
    Table
  },
  props: {
    users: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columns: [
        {
          label: 'First name',
          key: 'first_name',
          sort: true
        },
        {
          label: 'Last name',
          key: 'last_name'
        },
        {
          label: 'Username',
          key: 'username'
        },
        {
          label: 'Last seen',
          key: 'last_seen'
        }
      ]
    };
  }
};
</script>
