<template>
  <div class="min-h-screen flex flex-col">
    <div v-if="!loading" class="flex-grow px-6 pt-8 pb-2">
      <Label title="Destaques" :type="1" />
      <Label title="Promoções" :type="2" />
      <Slider type="P" :data="promo" />
      <Label title="Outros" :type="2" />
      <ProductGrid :data="others" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Label from "../components/Label.vue";
import Slider from "../components/Slider.vue";
import SliderLoad from "../components/SliderLoad.vue";
import Footer from "../components/Footer.vue";
import ProductGrid from '../components/ProductGrid.vue'
import Product from '../services/Product';

export default {
  data(){
    return {
      loading: true,
    }
  },
  methods: { 
  },
  async created(){
    console.log(this.$store);
    const promo = await Product.getProductsInPromo();
    const others = await Product.getAll();

    this.promo = promo.success ? promo.products : [];
    this.others = others.success ? others.product : [];

    this.loading = false;
  },
  components: {
    Slider,
    Label,
    Footer,
    SliderLoad,
    ProductGrid
  }
}
</script>