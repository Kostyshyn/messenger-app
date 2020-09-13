<template>
  <div class="icon">
    <component :is="icon" />
  </div>
</template>

<script>
export default {
  name: 'Icon',
  components: {},
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      icon: null
    };
  },
  computed: {
    iconLoader() {
      // prettier-ignore
      return () => import(
        /* webpackChunkName: "icons" */
        `@/assets/icons/${this.name}.svg`
      );
    }
  },
  methods: {
    load() {
      // prettier-ignore
      this.iconLoader().then(icon => {
        this.icon = icon;
      }).catch(err => {
        console.error(err);
      });
    }
  },
  created() {
    this.load();
  }
};
</script>
<style lang="scss" scoped>
.icon {
  min-width: 14px;
}
</style>
