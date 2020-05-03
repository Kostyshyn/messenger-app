<template>
  <div id="app">
    <Loader :loading="loading" />
    <div class="root-wrapper">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
      <transition name="fade" mode="out-in">
        <Popup v-if="popup.open" :popup="popup" />
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import Loader from '@/components/General/Helpers/Loader.vue';
import Popup from '@/components/General/Helpers/Popup.vue';

export default {
  name: 'App',
  components: {
    Loader,
    Popup
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      loading: 'app/loading',
      device: 'app/device',
      popup: 'app/popup'
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
