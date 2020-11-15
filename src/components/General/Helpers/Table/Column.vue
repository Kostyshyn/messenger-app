<template>
  <div class="table-column" :class="[className]">
    <slot />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Column',
  components: {},
  props: {
    className: {
      type: String,
      default: ''
    }
  }
};
</script>
<style scoped lang="scss">
.table-column {
  flex-grow: 1;
  &.index {
    max-width: fit-content;
  }
}
</style>
