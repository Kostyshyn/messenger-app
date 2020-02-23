<template>
  <div class="icon">
    <FontAwesomeIcon v-if="icon" :icon="icon" :spin="spin" />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'Icon',
  components: {
    FontAwesomeIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      icon: null,
      library: {
        search: 'faSearch',
        spinner: 'faSpinner',
        times: 'faTimes',
        logout: 'faSignOutAlt',
        phone: 'faPhone',
        video: 'faVideo',
        dots: 'faEllipsisV',
        options: 'faCog',
        bars: 'faBars'
      }
    };
  },
  computed: {
    iconLoader() {
      // prettier-ignore
      return () => import(
        /* webpackChunkName: "icons" */
        `@fortawesome/free-solid-svg-icons/${this.library[this.name]}.js`
      );
    }
  },
  methods: {
    load() {
      // prettier-ignore
      this.iconLoader().then(icon => {
        this.icon = icon[this.library[this.name]];
      }).catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    if (this.library[this.name]) {
      this.load();
    }
  }
};
</script>
<style lang="scss" scoped>
  .icon {
    min-width: 14px;
  }
</style>
