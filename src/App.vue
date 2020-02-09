<template>
  <div id="app">
    <Loader v-if="loading" />
    <div v-else>
      <Navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Navigation from '@/components/General/Navigation.vue';
import Loader from '@/components/Helpers/Loader.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Loader
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      loading: 'app/loading'
    })
  },
  methods: {
    ...mapActions({
      init: 'app/init'
    })
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss"></style>
