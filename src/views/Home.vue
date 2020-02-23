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
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/services/api';
import Button from '@/components/General/Button.vue';

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
    inputFile(e) {
      this.file = e.target.files[0];
    },
    async upload() {
      const formData = new FormData();
      formData.append('file', this.file);
      await api.uploadUserImage(formData);
    }
  },
  created() {}
};
</script>
