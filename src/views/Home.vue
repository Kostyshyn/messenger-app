<template>
  <div class="home main-wrapper">
    <h1>
      Home
    </h1>
    <p>Environment: {{ env }}</p>
    <form @submit.prevent="upload">
      <br />
      <input type="file" name="file" @change="inputFile"/>
      <br />
      <br />
      <Button color="primary" type="submit" ripple>
        Upload
      </Button>
    </form>
    <br />
    <Button ripple @click="toggle(true)">
      Open sidebar
    </Button>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';
import api from '@/services/api';
import Button from '@/components/Helpers/Button.vue';

export default {
  name: 'Home',
  components: {
    Button
  },
  data() {
    return {
      file: null
    };
  },
  computed: {
    env() {
      return process.env.NODE_ENV;
    }
  },
  methods: {
    ...mapActions({
      toggle: 'app/setSidebarState',
      openPopup: 'app/openPopup'
    }),
    inputFile(e) {
      this.file = e.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('file', this.file);
        await api.uploadUserImage(formData);
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {}
};
</script>
<style scoped lang="scss">
.home {
  position: relative;
  .overlay-wrap {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 200px;
  }
}
.mute-check {
  .icon {
    margin-left: 5px;
    min-width: 18px;
    text-align: center;
  }
}
</style>