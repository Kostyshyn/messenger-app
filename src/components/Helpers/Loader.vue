<template>
  <div class="loader">
    Loading...
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Loader",
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  computed: {},
  methods: {}
};
</script>
