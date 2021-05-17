<template>
    <Carousel @mouseenter="type == 'B' ? mouseHover = true : mouseHover = false" @mouseleave="mouseHover = false" class="mb-10" :wrap-around="true" :items-to-show="items" :breakpoints="breakpoints">
      <Slide v-for="dt in data" :key="dt.id">
        <div v-if="type == 'B'"
          ><Banner style="height: 24rem" :banner="dt"
        /></div>
        <template v-else><ProductCard :product="dt" /></template>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import ProductCard from "./ProductCard.vue";
import Banner from "./Banner.vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
    ProductCard,
    Banner
  },
  props: {
    data: Array,
    type: {
      type: String,
      default: "P",
    },
  },
  data() {
    return {
      breakpoints: {},
      items: 0,
      mouseHover: false,

      visible: false
    };
  },
  created: function () {
    if (this.type == "B") {
      this.breakpoints = {};
      this.items = 1;
      this.timer()
    } else {
      this.breakpoints = {
        300: {
          itemsToShow: 1,
          snapAlign: "left",
        },
        700: {
          itemsToShow: 3,
          snapAlign: "left",
        },
        1024: {
          itemsToShow: 5,
          snapAlign: "left",
        },
      };
      if(window.innerWidth >= 700 && window.innerWidth < 1024) this.items = 3
      else if(window.innerWidth >= 1024) this.items = 5
      else this.items = 1
    }
    //this.imgs = data.images

  },
  methods: {
    timer(){
      this.timervar = setInterval(() => {
        if(this.mouseHover) return
        document.getElementsByClassName('carousel__next')[0].click()
      }, 5000)
    },
  },
  unmounted() {
    clearInterval(this.timervar);
  },
};
</script>

<style>
.carousel__prev,
.carousel__next {
  background-color: #383F51;
}
.carousel__prev:hover,
.carousel__next:hover {
  color: #F6222E;
}
</style>