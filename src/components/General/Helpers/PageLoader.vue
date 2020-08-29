<template>
  <transition name="loader" mode="out-in">
    <Loader v-if="loading" className="page-loader" :loading="true" />
  </transition>
</template>

<script>
// @ is an alias to /src
import Loader from '@/components/General/Helpers/Loader.vue';

export default {
  name: 'PageLoader',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Loader
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.page-loader {
  overflow: hidden;
  position: fixed;
  background-color: $white-background-color;
  z-index: 9999;

  /deep/.circle-preloader {
    border-bottom-color: $primary-color;
  }
}
</style>
