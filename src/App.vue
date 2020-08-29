<template>
  <div id="app">
    <PageLoader :loading="loading" />
    <div class="root-wrapper">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
      <transition name="fade" mode="out-in">
        <Popup v-if="popup.open" :popup="popup" />
      </transition>
      <transition name="fade" mode="out-in">
        <Carousel v-if="carousel.open" />
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import PageLoader from '@/components/General/Helpers/PageLoader.vue';
import Popup from '@/components/General/Helpers/Popup.vue';
import Carousel from '@/components/General/Carousel.vue';

export default {
  name: 'App',
  components: {
    PageLoader,
    Popup,
    Carousel
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      loading: 'app/loading',
      device: 'app/device',
      popup: 'app/popup',
      carousel: 'app/carousel'
    })
  },
  methods: {
    ...mapActions({
      init: 'app/init',
      resize: 'app/resize'
    }),
    onResize() {
      this.resize(window.innerWidth);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.resize(window.innerWidth);
      window.addEventListener('resize', this.onResize);
    });
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style lang="scss">
@import './assets/styles/style.scss';
.root-wrapper {
  position: relative;
  padding-top: 50px;
  max-height: 100vh;
}
</style>
