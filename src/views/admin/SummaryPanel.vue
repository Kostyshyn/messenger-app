<template>
  <div>
    <h1>Admin page</h1>
    <p>Device: {{ device }}</p>
    <p>User name: {{ user.username }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SummaryPanel',
  components: {},
  computed: {
    ...mapGetters({
      user: 'user/user',
      device: 'app/device'
    })
  },
  methods: {
    ...mapActions({})
  }
};
</script>
