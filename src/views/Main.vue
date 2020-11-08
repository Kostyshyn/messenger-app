<template>
  <div class="main-wrapper navigation">
    <Navigation v-if="loggedIn" />
    <div class="main-page">
      <h1>Main page</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import Navigation from '@/components/General/Navigation.vue';

export default {
  name: 'Main',
  components: {
    Navigation
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
