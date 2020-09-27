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
      popup: 'popup/popup',
      carousel: 'app/carousel'
    })
  },
  methods: {
    ...mapActions({
      init: 'app/init',
      resize: 'app/resize',
      openPopup: 'popup/openPopup'
    }),
    onResize() {
      this.resize(window.innerWidth);
    }
  },
  async mounted() {
    await this.init();
    const { popup } = this.$route.query;
    this.openPopup(popup);
    this.$nextTick(() => {
      this.resize(window.innerWidth);
      window.addEventListener('resize', this.onResize);
    });
  },
  created() {},
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
  height: 100vh;
  box-sizing: border-box;
}
</style>
