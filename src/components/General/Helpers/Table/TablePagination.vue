<template>
  <div class="table-pagination" :class="[className]">
    <slot />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'TablePagination',
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
.table-pagination {
  box-sizing: border-box;
  min-height: 48px;
}
</style>
