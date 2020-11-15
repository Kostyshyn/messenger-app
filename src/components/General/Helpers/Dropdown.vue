<template>
  <div class="dropdown-list-wrapper">
    <div class="dropdown-trigger">
      <slot name="trigger" />
    </div>
    <transition name="slide" mode="out-in" @after-enter="afterEnter">
      <div
        v-show="show"
        v-click-outside="close"
        :class="['dropdown-body', position, { static: !alwaysOn }]"
        ref="dropdownBody"
      >
        <slot name="body" />
      </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src

const POSITION_TYPES = ['left', 'right'];

export default {
  name: 'Dropdown',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: Number,
      default: 200
    },
    backdrop: {
      type: Boolean,
      default: false
    },
    alwaysOn: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      validator: type => {
        return POSITION_TYPES.includes(type);
      },
      default: 'left'
    }
  },
  data() {
    return {
      init: false,
      defaultOffset: 5,
      closeOnScroll: true
    };
  },
  computed: {
    style() {
      // if (parseInt(this.height) > this.defaultHeight) {
      //   return {
      //     height: `${this.height}px`
      //   };
      // }
      return {};
    }
  },
  methods: {
    afterEnter() {
      this.init = true;
    },
    repositionDropdown() {
      const { dropdownBody } = this.$refs;
      const { defaultOffset, position } = this;
      if (dropdownBody) {
        dropdownBody.style.position = 'fixed';
        const { clientWidth, clientHeight } = dropdownBody;
        const { left, top, height, width } = this.$el.getBoundingClientRect();
        const topPos = top + height + defaultOffset;
        if (window.innerHeight < topPos + clientHeight) {
          dropdownBody.style.top = `${top - clientHeight - defaultOffset}px`;
        } else {
          dropdownBody.style.top = `${topPos}px`;
        }
        const leftPos = left + (position === 'left' ? 0 : width - clientWidth);
        dropdownBody.style.left = `${leftPos}px`;
      }
    },
    onScroll() {
      const { closeOnScroll } = this;
      if (closeOnScroll) {
        this.close();
      }
    },
    close() {
      if (this.show && this.init && this.backdrop) {
        this.$emit('close');
      }
    }
  },
  watch: {
    show(data) {
      if (!data) {
        this.init = false;
      } else {
        this.$nextTick(() => {
          if (this.alwaysOn) {
            this.repositionDropdown();
          }
        });
      }
    }
  },
  mounted() {
    if (this.alwaysOn) {
      window.addEventListener('scroll', this.onScroll, true);
    }
  },
  created() {},
  beforeDestroy() {
    if (this.alwaysOn) {
      window.removeEventListener('scroll', this.onScroll, true);
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown-list-wrapper {
  display: flex;
  width: fit-content;
  height: auto;
  position: relative;
  .dropdown-body {
    height: auto;
    min-width: fit-content;
    border-radius: 4px;
    background-color: $white-background-color;
    box-shadow: $block-shadow;
    z-index: 1;
    bottom: auto;
    &.left {
      right: auto;
    }
    &.right {
      left: auto;
    }
    &.static {
      position: absolute;
      top: calc(100% + 5px);
      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
    }
  }
}
</style>
