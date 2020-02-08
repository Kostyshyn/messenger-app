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

import Navigation from "@/components/General/Navigation.vue";
import Loader from "@/components/Helpers/Loader.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Loader
  },
  data() {
    return {};
  },
  computed: {
    loading() {
      return this.$store.state.app.loading;
    }
  },
  methods: {},
  created() {
    this.$store.dispatch("app/init");
  }
};
</script>

<style lang="scss"></style>
