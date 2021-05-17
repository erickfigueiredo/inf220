<template>
  <Carousel :wrap-around="true" :items-to-show="items" :breakpoints="breakpoints">
    <Slide v-for="id in 10" :key="id">
      <ProductLoad />
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import ProductLoad from "../components/ProductLoad.vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

export default {
  components: {
    Carousel,
    Slide,
    Navigation,
    ProductLoad
  },
  props: {
    data: [{}],
    type: {
      type: String,
      default: "P",
    },
  },
  data() {
    return {
      breakpoints: {},
      items: 1,
    };
  },
  created: function () {
    if (this.type == "B") {
      this.breakpoints = {};
      this.items = 1;
    } else {
      this.breakpoints = {
        300: {
          itemsToShow: 2,
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
      this.items = 5;
    }
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
