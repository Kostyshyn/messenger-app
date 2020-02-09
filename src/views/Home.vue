<template>
  <div class="home main-wrapper">
    <h1>
      Home
    </h1>
    <p>Environment: {{ env }}</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      users: []
    };
  },
  computed: {
    env() {
      return process.env.NODE_ENV;
    }
  },
  methods: {},
  created() {}
};
</script>
