<template>
  <Dropdown
    backdrop
    alwaysOn
    position="right"
    :show="show"
    @close="$emit('toggle', false)"
  >
    <template #trigger>
      <Button color="transparent" round ripple @click="$emit('toggle', !show)">
        <DotsVertical />
      </Button>
    </template>
    <template #body>
      <List>
        <ListItem
          v-for="(item, index) in items"
          :key="index"
          @click.native="$emit('action', item)"
        >
          <div v-if="item.icon" class="item-icon">
            <Icon :name="item.icon" />
          </div>
          <div class="item-label">
            {{ item.label }}
          </div>
        </ListItem>
      </List>
    </template>
  </Dropdown>
</template>

<script>
// @ is an alias to /src
import Dropdown from '@/components/General/Helpers/Dropdown';
import List from '@/components/General/List/List.vue';
import ListItem from '@/components/General/List/ListItem.vue';
import Icon from '@/components/General/Helpers/Icon.vue';
import Button from '@/components/General/Helpers/Button.vue';
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue';

export default {
  name: 'DropdownList',
  components: {
    Dropdown,
    List,
    ListItem,
    Icon,
    Button,
    DotsVertical
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style scoped lang="scss">
/deep/ .dropdown-trigger {
  .button {
    color: $dark-grey-font-color;
  }
}
.item-icon {
  display: flex;
  font-size: 20px;
  height: 28px;
  width: 24px;
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
  line-height: 28px;
  padding: 0 5px;
  color: $black-font-color;
  max-width: 200px;
  @include truncate-text;
  @media (max-width: $sm) {
    font-size: $list-item-font-sm;
  }
}
</style>
