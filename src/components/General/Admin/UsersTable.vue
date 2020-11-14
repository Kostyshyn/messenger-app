<template>
  <Table
    index
    :data="users.data"
    :columns="columns"
    className="users-table"
    @sort="$emit('sortUsers', $event)"
  >
    <template #last_seen="{ col, cell }">
      {{ cell[col.key] | moment('LL') }}
    </template>
    <template #options>
      <div class="users-options">
        <Button color="transparent" round ripple @click="toggleOptions">
          <DotsVertical />
        </Button>
      </div>
    </template>
  </Table>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/General/Helpers/Table/Table.vue';
import Button from '@/components/General/Helpers/Button.vue';
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue';

export default {
  name: 'UsersTable',
  components: {
    Table,
    Button,
    DotsVertical
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
          key: 'last_name',
          sort: true
        },
        {
          label: 'Username',
          key: 'username',
          sort: true
        },
        {
          label: 'Last seen',
          key: 'last_seen',
          sort: true
        },
        {
          label: 'Options',
          key: 'options',
          resetStyles: true
        }
      ]
    };
  },
  methods: {
    toggleOptions() {}
  }
};
</script>
<style scoped lang="scss">
.users-table {
  .users-options {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /deep/ .button {
      color: $black-font-color;
    }
  }
}
</style>
