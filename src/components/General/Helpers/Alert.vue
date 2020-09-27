<template>
  <Overlay
    className="alert-overlay"
    position="absolute"
    @click.self.native="close('overlay')"
  >
    <form class="alert-popup" :style="style">
      <div class="alert-popup-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="alert-popup-body">
        <slot />
      </div>
      <div class="alert-popup-footer">
        <Button
          className="close"
          color="error"
          ripple
          @click="close('button')"
        >
          Close
        </Button>
        <Button className="save" type="submit" color="primary" ripple>
          Okay
        </Button>
      </div>
    </form>
  </Overlay>
</template>

<script>
// @ is an alias to /src
import Overlay from '@/components/General/Helpers/Overlay.vue';
import Button from '@/components/General/Helpers/Button.vue';

export default {
  name: 'Alert',
  components: {
    Overlay,
    Button
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    height: {
      type: Number
    }
  },
  data() {
    return {
      defaultHeight: 165
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
    close(type) {
      this.$emit('close', type);
    }
  },
  watch: {},
  mounted() {},
  created() {}
};
</script>
<style lang="scss" scoped>
</style>
