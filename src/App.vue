<template>
  <div id="app">
    <PageLoader :loading="loading" />
    <div class="root-wrapper">
      <transition name="page" mode="out-in">
        <router-view v-if="!loading" />
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
      user: 'user/user',
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
    console.log('Mounted: App', this.user);
    await this.init();
    console.log('Mounted and fetched data: App', this.user);
    const { popup } = this.$route.query;
    this.openPopup(popup);
    this.$nextTick(() => {
      this.resize(window.innerWidth);
      window.addEventListener('resize', this.onResize);
    });
  },
  created() {
    console.log('Created: App');
  },
  beforeCreate() {
    console.log('beforeCreate', 'App');
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
  height: 100vh;
  box-sizing: border-box;
}
</style>
