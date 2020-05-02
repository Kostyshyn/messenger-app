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
import Overlay from '@/components/Helpers/Overlay.vue';
import Icon from '@/components/Helpers/Icon.vue';
import { mapActions } from 'vuex';

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
      default: 9998
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
    title() {
      return this.nestedData.title;
    },
    popupStyle() {
      return {
        'z-index': this.zIndex
      };
    },
    popupContentStyle() {
      return {
        width: `${this.width}px`
      };
    }
  },
  methods: {
    ...mapActions({
      close: 'app/closePopup'
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
    }
  },
  watch: {},
  mounted() {
    this.nestedData = this.popup.component.data();
    const { backAction } = this.popup.component.methods;
    if (backAction && typeof backAction === 'function') {
      this.backAction = backAction;
    }
  }
};
</script>
<style lang="scss" scoped>
.popup {
  position: fixed;
  overflow: hidden;
  top: 0px;
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
    top: 0px;
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
        margin: 0px 0px 0px 4px;
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
}
</style>
