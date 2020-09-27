<template>
  <div class="dropdown-list-wrapper">
    <div class="dropdown-trigger">
      <slot name="trigger" />
    </div>
    <transition name="slide" mode="out-in" @after-enter="afterEnter">
      <div v-if="show" v-click-outside="close" class="dropdown-body">
        test
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
      if (this.show && this.init) {
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
  background-color: #c1c1c1;
  width: fit-content;
  height: auto;
  position: relative;
  .dropdown-body {
    position: absolute;
    top: 100%;
    left: 0;
    height: 200px;
    width: 300px;
    background-color: grey;
  }
}
</style>
