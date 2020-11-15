<template>
  <Overlay className="carousel-overlay" :zIndex="zIndex" position="absolute">
    <Close
      title="Close"
      :size="closeBtnSize"
      class="close-btn"
      @click="close"
    />
    <transition name="fade" mode="out-in" @after-enter="afterEnter">
      <div v-if="showCarousel" class="carousel-wrap">
        <agile
          class="main"
          ref="main"
          :options="mainOptions"
          :as-nav-for="asNav"
          @after-change="afterChange"
        >
          <div class="slide" v-for="(slide, index) in slides.data" :key="index">
            <img crossorigin :src="userImage(slide)" />
          </div>
          <template slot="prevButton">
            <!-- use property fillColor to change background-color -->
            <ChevronLeft :size="navBtnSize" />
          </template>
          <template slot="nextButton">
            <ChevronRight :size="navBtnSize" />
          </template>
          <template slot="caption">
            <div class="image-caption">
              {{ slides.data[currentSlide].createdAt | moment('LL') }}
            </div>
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
            <img crossorigin :src="userImage(slide, 'preview')" />
          </div>
        </agile>
      </div>
      <Loader v-else :loading="requestProcessing" />
    </transition>
  </Overlay>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import { VueAgile } from 'vue-agile';
import Overlay from '@/components/General/Helpers/Overlay.vue';
import Loader from '@/components/General/Helpers/Loader.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import Close from 'vue-material-design-icons/Close.vue';
import imagePath from '@/utils/imagePath';
import config from '@/config';
import api from '@/services/api';

export default {
  name: 'Carousel',
  components: {
    agile: VueAgile,
    Overlay,
    Loader,
    ChevronRight,
    ChevronLeft,
    Close
  },
  props: {
    images: {
      type: Object,
      default: () => ({})
    },
    imagesUrl: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 13
    }
  },
  data() {
    return {
      asNav: [],
      asMain: [],
      mainOptions: {
        infinite: false,
        dots: false
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
      currentSlide: 0,
      handleKeys: ['ArrowRight', 'ArrowLeft']
    };
  },
  computed: {
    ...mapGetters({
      baseUrl: 'app/baseUrl',
      user: 'user/user',
      token: 'user/token',
      device: 'app/device'
    }),
    showCarousel() {
      return (
        !this.requestProcessing && this.slides.data && !!this.slides.data.length
      );
    },
    navBtnSize() {
      return this.device === 'sm' ? 38 : 48;
    },
    closeBtnSize() {
      return this.device === 'sm' ? 24 : 38;
    }
  },
  methods: {
    ...mapActions({
      close: 'app/closeCarousel'
    }),
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
        const { _id: selfId } = this.user;
        const id = this.userId || selfId;
        this.requestProcessing = true;
        this.slides = await api.getUserImages(id);
        this.requestProcessing = false;
      } catch (err) {
        this.requestProcessing = false;
        console.log(err);
      }
    },
    initCarousel() {
      this.$nextTick(() => {
        const { thumbnails, main } = this.$refs;
        this.asNav.push(thumbnails);
        this.asMain.push(main);
      });
    },
    afterEnter() {
      this.initCarousel();
    },
    afterChange(e) {
      this.currentSlide = e.currentSlide;
    },
    keyboardHandler(e) {
      const { main } = this.$refs;
      if (main && e.key && this.handleKeys.includes(e.key)) {
        if (e.key === 'ArrowRight') {
          main.goToNext();
        } else {
          main.goToPrev();
        }
      }
    }
  },
  filters: {},
  watch: {},
  mounted() {
    window.addEventListener('keydown', this.keyboardHandler);
  },
  created() {
    if (this.images.data) {
      this.slides = { ...this.images };
    } else {
      this.getImages();
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyboardHandler);
  }
};
</script>
<style lang="scss" scoped>
.carousel-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  .close-btn {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    width: 55px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white-font-color;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }

  @media (max-width: $sm) {
    .close-btn {
      /*top: 16px;*/
      /*right: 15px;*/
    }
  }
}
.carousel-wrap {
  width: 540px;
  /deep/ .main {
    .agile__actions {
      .agile__nav-button {
        background: transparent;
        border: none;
        color: $white-font-color;
        cursor: pointer;
        font-size: 24px;
        height: 100%;
        position: absolute;
        top: 0;
        transition: 0.3s ease-in-out;
        width: 80px;
        &[disabled] {
          visibility: hidden;
          opacity: 0;
        }
        &:hover {
          background-color: rgba(#000, 0.5);
          opacity: 1;
        }
        &--prev {
          left: -80px;
        }
        &--next {
          right: -80px;
        }
        @media (max-width: $md) {
          &--prev {
            left: 0;
          }
          &--next {
            right: 0;
          }
        }
      }
    }
    .agile__caption {
      position: absolute;
      bottom: 5px;
      display: flex;
      justify-content: center;
      width: 100%;
      .image-caption {
        background: rgba(0, 0, 0, 0.5);
        padding: 6px 8px;
        border-radius: 10px;
        font-size: 13px;
        color: #fff;
        line-height: 10px;
      }
    }
  }
  /deep/ .thumbnails {
    padding-top: 10px;
  }
  .slide {
    align-items: center;
    box-sizing: border-box;
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
  @media (max-width: $sm) {
    width: 100%;
    /deep/ .main {
      .agile__actions {
        .agile__nav-button {
          width: 60px;
        }
      }
    }
    .slide {
      height: auto;
      &.agile__slide--active {
        min-width: 108px;
      }
    }
  }
}
</style>
