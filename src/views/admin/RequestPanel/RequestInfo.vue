<template>
  <h1>Request: {{ $route.params.id }}</h1>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RequestInfo',
  components: {},
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
