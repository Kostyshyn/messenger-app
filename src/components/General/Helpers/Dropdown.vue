<template>
  <div class="dropdown-list-wrapper">
    <div class="dropdown-trigger">
      <slot name="trigger" />
    </div>
    <transition name="slide" mode="out-in" @after-enter="afterEnter">
      <div v-if="show" v-click-outside="close" class="dropdown-body">
        <slot name="body" />
      </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src

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
    }
  },
  data() {
    return {
      init: false
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
      }
    }
  },
  mounted() {},
  created() {}
};
</script>
<style lang="scss" scoped>
.dropdown-list-wrapper {
  display: flex;
  width: fit-content;
  height: auto;
  position: relative;
  .dropdown-body {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    height: auto;
    min-width: 100px;
    border-radius: 4px;
    background-color: $white-background-color;
    box-shadow: $block-shadow;
    z-index: 1;
  }
}
</style>
