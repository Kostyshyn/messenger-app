<template>
  <div class="popup">
    <div class="popup-body" v-if="popup.component">
      <component :is="popup.component" v-bind="popup.data" />
    </div>
    <Overlay @click.native="close" />
  </div>
</template>

<script>
// @ is an alias to /src
import Overlay from '@/components/Helpers/Overlay.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Popup',
  components: {
    Overlay
  },
  props: {
    popup: {
      type: Object,
      default: () => ({
        open: false,
        name: '',
        component: null,
        options: {},
        data: {}
      })
    },
    zIndex: {
      type: Number,
      default: 9998
    },
    width: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions({
      close: 'app/closePopup'
    })
  },
  watch: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.popup {
  z-index: 9998;
  position: fixed;
  overflow: hidden;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-body {
    z-index: 11;
    position: relative;
    min-height: 100px;
    max-height: 100%;
    min-width: 300px;
    max-width: 100%;
    border-radius: 4px;
    overflow: hidden;
    top: 0px;
    background: $white-background-color;
    box-shadow: $block-shadow;
  }
}
</style>
