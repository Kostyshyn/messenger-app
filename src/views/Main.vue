<template>
  <div class="main-wrapper">
    <Navigation v-if="loggedIn" />
    <div class="main-page">Main page</div>
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
<style scoped lang="scss"></style>
