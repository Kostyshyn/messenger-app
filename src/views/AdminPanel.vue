<template>
  <Wrapper>
    <template #navigation>
      <Navigation v-if="loggedIn" invert>
        <AdminSidebar />
      </Navigation>
    </template>
    <template #page>
      <router-view />
    </template>
  </Wrapper>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import Wrapper from '@/components/General/Wrapper.vue';
import Navigation from '@/components/General/Navigation.vue';
import AdminSidebar from '@/components/General/AdminSidebar.vue';

export default {
  name: 'AdminPanel',
  components: {
    Wrapper,
    Navigation,
    AdminSidebar
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    })
  },
  methods: {
    ...mapActions({})
  },
  created() {}
};
</script>
<style scoped lang="scss"></style>
