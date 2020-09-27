<template>
  <div class="main-wrapper">
    <Navigation v-if="loggedIn" />
    <div class="main-page test-page">
      <h1>Test page</h1>
      <div class="dropdown-lists">
        <Dropdown :show="showDropdown1" @close="showDropdown1 = false">
          <template #trigger>
            <button @click="showDropdown1 = !showDropdown1">Open 1</button>
          </template>
        </Dropdown>
        <Dropdown :show="showDropdown2" @close="showDropdown2 = false">
          <template #trigger>
            <button @click="showDropdown2 = !showDropdown2">Open 2</button>
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

export default {
  name: 'Test',
  components: {
    Navigation,
    Dropdown
  },
  data() {
    return {
      showDropdown1: false,
      showDropdown2: false
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
}
</style>
