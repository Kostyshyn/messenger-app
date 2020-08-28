<template>
  <Overlay
    className="carousel-overlay"
    position="absolute"
    @click.self.native="close"
  >
    <div v-if="slides.data && slides.data.length" class="carousel-wrap">
      <agile class="main" ref="main" :options="mainOptions" :as-nav-for="asNav">
        <div class="slide" v-for="(slide, index) in slides.data" :key="index">
          <img :src="userImage(slide)" />
        </div>
        <template slot="prevButton">
          <!-- use property fillColor to change background-color -->
          <ChevronLeft :size="navBtnSize" />
        </template>
        <template slot="nextButton">
          <ChevronRight :size="navBtnSize" />
        </template>
      </agile>
      <agile
        class="thumbnails"
        ref="thumbnails"
        :options="navOptions"
        :as-nav-for="asMain"
      >
        <div
          class="slide thumbnail"
          v-for="(slide, index) in slides.data"
          @click="$refs.thumbnails.goTo(index)"
          :key="index"
        >
          <img :src="userImage(slide, 'preview')" />
        </div>
      </agile>
    </div>
  </Overlay>
</template>

<script>
// @ is an alias to /src
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import { mapGetters } from 'vuex';
import { VueAgile } from 'vue-agile';
import Overlay from '@/components/General/Helpers/Overlay.vue';
import imagePath from '@/utils/imagePath';
import config from '@/config';
import api from '@/services/api';

export default {
  name: 'Carousel',
  components: {
    agile: VueAgile,
    Overlay,
    ChevronRight,
    ChevronLeft
  },
  props: {
    images: {
      type: Object,
      default: () => ({})
    },
    imagesUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      asNav: [],
      asMain: [],
      mainOptions: {
        infinite: false,
        dots: false,
        fade: true
      },
      navOptions: {
        infinite: false,
        centerMode: true,
        dots: false,
        slidesToShow: 5,
        navButtons: false,
        responsive: []
      },
      slides: {},
      requestProcessing: false,
      imageSizeSuffix: config.IMAGES.CAROUSEL_IMAGE_SIZE,
      navBtnSize: 48
    };
  },
  computed: {
    ...mapGetters({
      baseUrl: 'app/baseUrl',
      user: 'user/user',
      token: 'user/token'
    })
  },
  methods: {
    userImage(slide) {
      const { baseUrl, token } = this;
      const image = imagePath(
        slide.path,
        this.imageSizeSuffix,
        `?token=${token}`
      );
      return `${baseUrl}/${image}`;
    },
    async getImages() {
      if (this.requestProcessing) {
        return;
      }
      try {
        const { _id: id } = this.user;
        this.requestProcessing = true;
        this.slides = await api.getUserImages(id);
        this.requestProcessing = false;
      } catch (err) {
        this.requestProcessing = false;
        console.log(err);
      }
    },
    close() {
      this.$emit('close');
    }
  },
  watch: {},
  mounted() {
    this.asNav.push(this.$refs.thumbnails);
    this.asMain.push(this.$refs.main);
  },
  created() {
    if (this.images.data) {
      this.slides = { ...this.images };
    } else {
      this.getImages();
    }
  }
};
</script>
<style lang="scss" scoped>
.carousel-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.carousel-wrap {
  width: 540px;
  /deep/ .main {
    .agile__actions {
      .agile__nav-button {
        background: transparent;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 24px;
        height: 100%;
        position: absolute;
        top: 0;
        transition-duration: 0.3s;
        width: 80px;
        &:hover {
          background-color: rgba(#000, 0.5);
          opacity: 1;
        }
        &--prev {
          left: 0;
        }
        &--next {
          right: 0;
        }
      }
    }
  }
  /deep/ .thumbnails {
    padding-top: 10px;
  }
  .slide {
    align-items: center;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    height: 540px;
    justify-content: center;
    &.thumbnail {
      cursor: pointer;
      height: 98px;
      max-width: 108px;
      padding: 0 5px;
      opacity: 0.75;
      transition: opacity 0.3s;
      img {
        max-width: 108px;
      }
    }
    &.agile__slide--active,
    &:hover {
      opacity: 1;
    }
    img {
      height: 100%;
      object-fit: cover;
      object-position: center;
      width: 100%;
    }
  }
}
</style>
