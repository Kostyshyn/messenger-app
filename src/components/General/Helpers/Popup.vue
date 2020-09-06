<template>
  <div class="popup" :style="popupStyle">
    <div
      class="popup-content"
      v-if="popup.component"
      :style="popupContentStyle"
    >
      <div class="popup-header">
        <div class="back" v-if="backAction" @click="handleBackClick">
          <Icon name="arrow_back" />
        </div>
        <h2>{{ title }}</h2>
        <div class="close" v-if="options.close" @click="close">
          <Icon name="clear" />
        </div>
      </div>
      <component :is="popup.component" v-bind="popup.data" />
    </div>
    <Overlay @click.native="handleBackdropClick" />
  </div>
</template>

<script>
// @ is an alias to /src
import Overlay from '@/components/General/Helpers/Overlay.vue';
import Icon from '@/components/General/Helpers/Icon.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Popup',
  components: {
    Overlay,
    Icon
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
      default: 12
    },
    width: {
      type: Number,
      default: 320
    }
  },
  data() {
    return {
      nestedData: {},
      backAction: null,
      options: {
        close: true,
        backdrop: true,
        ...this.popup.options
      }
    };
  },
  computed: {
    ...mapGetters({
      device: 'app/device'
    }),
    title() {
      return this.nestedData.title;
    },
    popupStyle() {
      return {
        'z-index': this.zIndex
      };
    },
    popupContentStyle() {
      const small = this.device === 'sm';
      const width = small ? '100%' : `${this.width}px`;
      const height = small ? '100%' : 'auto';
      return { width, height };
    }
  },
  methods: {
    ...mapActions({
      close: 'popup/closePopup'
    }),
    handleBackClick() {
      if (this.backAction) {
        this.backAction();
      }
    },
    handleBackdropClick() {
      if (this.options.backdrop) {
        this.close();
      }
    },
    setQuery(query) {
      const { query: currentQuery } = this.$route;
      if (!this._.isEqual(query, currentQuery)) {
        this.$router.push({ query });
      }
    }
  },
  watch: {},
  mounted() {
    const { name } = this.popup;
    this.setQuery({
      popup: name
    });
    this.nestedData = this.popup.component.data();
    const { backAction } = this.popup.component.methods;
    if (backAction && typeof backAction === 'function') {
      this.backAction = backAction;
    }
  },
  beforeDestroy() {
    this.setQuery({});
  }
};
</script>
<style lang="scss" scoped>
.popup {
  position: fixed;
  overflow: hidden;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-content {
    z-index: 11;
    position: relative;
    min-height: 100px;
    max-height: 100%;
    max-width: 100%;
    border-radius: 4px;
    overflow: hidden;
    top: 0;
    background: $white-background-color;
    box-shadow: $block-shadow;
    .popup-header {
      display: flex;
      flex-direction: row;
      padding: 15px 10px 10px 10px;
      /*background-color: $light-grey-color;*/
      h2 {
        width: 100%;
        user-select: none;
        margin: 0 0 0 4px;
        @include truncate-text;
      }
      .back,
      .close {
        cursor: pointer;
        display: flex;
        width: 24px;
        height: 28px;
        .icon {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          /deep/ svg {
            fill: $primary-color;
          }
        }
      }
      .back {
        margin-right: 7px;
      }
      .close {
        margin-left: auto;
        margin-right: 5px;
      }
    }
  }
  @media (max-width: $sm) {
    .popup-content {
      border-radius: 0;
      box-shadow: none;
    }
  }
}
</style>
