<template>
  <Overlay
    className="carousel-overlay"
    position="absolute"
    @click.self.native="close"
  >
    <div class="carousel-wrap">
      <agile class="main" ref="main" :options="mainOptions" :as-nav-for="asNav">
        <div class="slide" v-for="(slide, index) in slides" :key="index">
          <img :src="userImage(slide)"/>
        </div>
      </agile>
      <agile class="thumbniails" ref="thumbnails" :options="navOptions" :as-nav-for="asMain">
        <div
          class="slide thumbniail"
          v-for="(slide, index) in slides"
          @click="$refs.thumbnails.goTo(index)"
          :key="index"
        >
          <img :src="userImage(slide)"/>
        </div>
        <template slot="prevButton">
          prev
        </template>
        <template slot="nextButton">
          next
        </template>
      </agile>
    </div>
  </Overlay>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import { VueAgile } from 'vue-agile';
import Overlay from '@/components/General/Helpers/Overlay.vue';

export default {
  name: 'Carousel',
  components: {
    agile: VueAgile,
    Overlay
  },
  props: {
    images: []
  },
  data() {
    return {
      asNav: [],
      asMain: [],
      mainOptions: {
        dots: false,
        fade: true,
        navButtons: false
      },
      navOptions: {
        centerMode: true,
        dots: false,
        slidesToShow: 3,
        responsive: []
      },
      slides: this.images
    };
  },
  computed: {
    ...mapGetters({
      baseUrl: 'app/baseUrl',
      token: 'user/token'
    })
  },
  methods: {
    userImage(image) {
      const { baseUrl, token } = this;
      return `${baseUrl}/${image.path}?token=${token}`;
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
  max-width: 450px;
  .slide {
    align-items: center;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    height: 450px;
    justify-content: center;
    &.thumbniail {
      cursor: pointer;
      height: 100px;
      padding: 0 5px;
      transition: opacity .3s;
    }
    &:hover {
      opacity: .75;
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
