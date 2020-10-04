<template>
  <div class="main-wrapper">
    <Navigation v-if="loggedIn" />
    <div class="main-page test-page">
      <h1>Test page</h1>
      <div class="dropdown-lists">
        <Dropdown :show="showDropdown1" @close="showDropdown1 = false">
          <template #trigger>
            <Button
              color="transparent"
              round
              ripple
              @click="showDropdown1 = !showDropdown1"
            >
              <DotsVertical />
            </Button>
          </template>
          <template #body>
            test 1
          </template>
        </Dropdown>
        <Dropdown backdrop :show="showDropdown2" @close="showDropdown2 = false">
          <template #trigger>
            <Button round ripple @click="showDropdown2 = !showDropdown2">
              <DotsVertical />
            </Button>
          </template>
          <template #body>
            <List>
              <ListItem
                v-for="(item, index) in list"
                :key="index"
                @click.native="$emit('action')"
              >
                <div class="item-label">
                  {{ item.label }}
                </div>
              </ListItem>
            </List>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import Navigation from '@/components/General/Navigation.vue';
import Dropdown from '@/components/General/Helpers/Dropdown';
import List from '@/components/General/List/List.vue';
import ListItem from '@/components/General/List/ListItem.vue';
import Button from '@/components/General/Helpers/Button.vue';
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue';

export default {
  name: 'Test',
  components: {
    Navigation,
    Dropdown,
    List,
    ListItem,
    Button,
    DotsVertical
  },
  data() {
    return {
      showDropdown1: false,
      showDropdown2: false,
      list: [
        {
          label: 'Menu item 1'
        },
        {
          label: 'Menu item 2'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      device: 'app/device',
      loggedIn: 'user/loggedId'
    })
  },
  methods: {
    ...mapActions({})
  },
  created() {}
};
</script>
<style scoped lang="scss">
.dropdown-lists {
  display: flex;
  width: 500px;
  justify-content: space-between;
  .item-label {
    user-select: none;
    font-size: $list-item-font;
    line-height: 36px;
    padding: 0 5px;
    font-weight: 600;
    color: $black-font-color;
    white-space: nowrap;
    @media (max-width: $sm) {
      font-size: $list-item-font-sm;
    }
  }
}
</style>
