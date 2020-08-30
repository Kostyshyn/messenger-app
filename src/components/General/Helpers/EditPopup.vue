<template>
  <Overlay
    className="edit-popup-overlay"
    position="absolute"
    @click.self.native="close('overlay')"
  >
    <div class="edit-popup" :style="style">
      <div class="edit-popup-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="edit-popup-body">
        <slot />
      </div>
      <div class="edit-popup-footer">
        <Button
          className="cancel"
          color="transparent"
          ripple
          @click="close('button')"
        >
          Cancel
        </Button>
        <Button className="save" color="transparent" ripple @click="save">
          Save
        </Button>
      </div>
    </div>
  </Overlay>
</template>

<script>
// @ is an alias to /src
import Overlay from '@/components/General/Helpers/Overlay.vue';
import Button from '@/components/General/Helpers/Button.vue';

export default {
  name: 'EditPopup',
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
      if (parseInt(this.height) > this.defaultHeight) {
        return {
          height: `${this.height}px`
        };
      }
      return {};
    }
  },
  methods: {
    save() {
      this.$emit('save');
    },
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
.edit-popup-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
}
.edit-popup {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-height: 165px;
  width: 90%;
  min-width: 256px;
  padding: 0 15px 5px 15px;
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
  background: $white-background-color;
  box-shadow: $block-shadow;
  .edit-popup-header {
    display: flex;
    flex-direction: row;
    padding: 15px 0 20px 0;
    h3 {
      width: 100%;
      user-select: none;
      margin: 0;
      @include truncate-text;
    }
  }
  .edit-popup-footer {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
