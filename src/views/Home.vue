<template>
  <div class="home">
    <Carousel
      v-if="showCarousel"
      :images="images"
      @close="showCarousel = false"
    />
    <Button ripple @click="showCarousel = true">
      Open carousel
    </Button>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';
import api from '@/services/api';
import Button from '@/components/General/Helpers/Button.vue';
import Carousel from '@/components/General/Carousel.vue';

export default {
  name: 'Home',
  components: {
    Carousel,
    Button
  },
  data() {
    return {
      file: null,
      showCarousel: false,
      images: []
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
    },
    async getImages() {
      try {
        this.images = await api.getUserImages();
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.getImages();
  }
};
</script>
<style scoped lang="scss">
.mute-check {
  .icon {
    margin-left: 5px;
    min-width: 18px;
    text-align: center;
  }
}
</style>
