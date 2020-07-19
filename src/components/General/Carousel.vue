<template>
  <Overlay
    className="carousel-overlay"
    position="absolute"
    @click.self.native="close"
  >
    <div class="carousel-wrap">
      <agile class="main" ref="main" :options="mainOptions" :as-nav-for="asNav">
        <div class="slide" v-for="(slide, index) in slides.data" :key="index">
          <img :src="userImage(slide)" />
        </div>
        <template slot="prevButton">
          <Icon name="arrow_left" />
        </template>
        <template slot="nextButton">
          <Icon name="arrow_right" />
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
import { mapGetters } from 'vuex';
import { VueAgile } from 'vue-agile';
import Overlay from '@/components/General/Helpers/Overlay.vue';
import Icon from '@/components/General/Helpers/Icon.vue';
import imagePath from '@/utils/imagePath';

export default {
  name: 'Carousel',
  components: {
    agile: VueAgile,
    Overlay,
    Icon
  },
  props: {
    images: {
      type: Object,
      default: () => ({})
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
        slidesToShow: 3,
        navButtons: false,
        responsive: []
      },
      slides: this.images,
      imageSizeSuffix: '_1080_1080'
    };
  },
  computed: {
    ...mapGetters({
      baseUrl: 'app/baseUrl',
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
    save() {
      this.$emit('save');
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
  created() {}
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
  width: 450px;
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
    height: 450px;
    justify-content: center;
    &.thumbnail {
      cursor: pointer;
      height: 140px;
      max-width: 150px;
      padding: 0 5px;
      transition: opacity 0.3s;
      img {
        max-width: 140px;
      }
    }
    &:hover {
      opacity: 0.75;
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
