<template>
  <div
    class="main-wrapper"
    :class="[className, { navigation: $slots.navigation }]"
  >
    <slot name="navigation" />
    <div class="main-page">
      <slot name="page" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Wrapper',
  components: {},
  props: {
    className: {
      type: [String, Array]
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped></style>
