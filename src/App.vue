<template>
  <div id="app">
    <Loader :loading="loading" />
    <div>
      <Navigation />
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
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
