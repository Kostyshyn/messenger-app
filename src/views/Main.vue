<template>
  <Wrapper>
    <template #navigation>
      <Navigation v-if="loggedIn">
        <UserSidebar />
      </Navigation>
    </template>
    <template #page>
      <h1>Main page</h1>
    </template>
  </Wrapper>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import Wrapper from '@/components/General/Wrapper.vue';
import Navigation from '@/components/General/Navigation.vue';
import UserSidebar from '@/components/General/UserSidebar.vue';

export default {
  name: 'Main',
  components: {
    Wrapper,
    Navigation,
    UserSidebar
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      device: 'app/device',
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
