<template>
  <ListItem
    :to="item.link"
    :exact="item.exact"
    :className="className"
    @click.native="$emit('action')"
  >
    <div class="item-icon">
      <Icon :name="item.icon" />
    </div>
    <div class="item-label">
      {{ item.label }}
    </div>
  </ListItem>
</template>

<script>
// @ is an alias to /src
import Icon from '@/components/General/Helpers/Icon.vue';
import ListItem from '@/components/General/List/ListItem.vue';

export default {
  name: 'IconListItem',
  components: {
    ListItem,
    Icon
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    className: {
      type: [String, Array]
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.item-icon {
  display: flex;
  font-size: 20px;
  height: 36px;
  width: 30px;
  align-items: center;
  justify-content: center;
  /deep/ .icon {
    display: flex;
    align-items: center;
    svg {
      fill: $dark-grey-color;
    }
  }
}
.item-label {
  user-select: none;
  font-size: $list-item-font;
  line-height: 36px;
  padding: 0 10px;
  font-weight: 600;
  color: $black-font-color;
  @media (max-width: $sm) {
    font-size: $list-item-font-sm;
  }
}
</style>
