<template>
  <DropdownList
    :items="options"
    :show="showOptions"
    @toggle="showOptions = $event"
  />
</template>

<script>
// @ is an alias to /src
import DropdownList from '@/components/General/Helpers/DropdownList';

export default {
  name: 'UsersTableOptions',
  components: {
    DropdownList
  },
  props: {},
  data() {
    return {
      options: [
        {
          label: 'Edit',
          icon: 'edit'
        },
        {
          label: 'Delete',
          icon: 'delete'
        }
      ],
      showOptions: false
    };
  }
};
</script>
<style scoped lang="scss"></style>
