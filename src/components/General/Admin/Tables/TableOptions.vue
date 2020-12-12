<template>
  <DropdownList
    :items="options"
    :show="showOptions"
    @toggle="showOptions = $event"
    @action="$emit('action', $event)"
  />
</template>

<script>
// @ is an alias to /src
import DropdownList from '@/components/General/Helpers/DropdownList';

export default {
  name: 'TableOptions',
  components: {
    DropdownList
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showOptions: false
    };
  }
};
</script>
<style scoped lang="scss"></style>
