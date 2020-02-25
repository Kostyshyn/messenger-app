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
    <br/>
    <br/>
    <Check
      class="mute-check"
      v-model="mute"
      name="test">
      Mute
      <!-- <Icon v-show="mute" name="bellOff" /> -->
      <!-- <Icon v-show="!mute" name="bell" /> -->
    </Check>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/services/api';
import Button from '@/components/General/Button.vue';
import Check from '@/components/General/Form/Check.vue';
// import Icon from '@/components/General/Icon.vue';

export default {
  name: 'Home',
  components: {
    Button,
    Check
    // Icon
  },
  data() {
    return {
      file: null,
      mute: false
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