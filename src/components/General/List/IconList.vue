<template>
  <List :heading="heading">
    <IconListItem
      v-for="(item, index) in list"
      :item="item"
      :key="index"
      @action="$emit('action', item.action)"
    />
  </List>
</template>

<script>
// @ is an alias to /src
import List from '@/components/General/List/List.vue';
import IconListItem from '@/components/General/List/IconListItem.vue';

export default {
  name: 'IconList',
  components: {
    List,
    IconListItem
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
