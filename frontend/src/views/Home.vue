<template>
  <div class="min-h-screen flex flex-col">
    <div v-if="!loading" class="flex-grow px-6 pt-8 pb-2">
      <Slider type="B" :data="products" />
      <Label title="Destaques" :type="1" />
      <Label title="Promoções" :type="2" />
      <Slider type="P" :data="products" />
      <Label title="Preto São Gabriel" :type="2" />
      <Slider type="P" :data="products" />
      <Label title="Material 2" :type="2" />
      <Slider type="P" :data="products" />
      <Label title="Material 3" :type="2" />
      <Slider type="P" :data="products" />
      <Label title="Material 4" :type="2" />
      <Slider type="P" :data="products" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Label from "../components/Label.vue";
import Slider from "../components/Slider.vue";
import SliderLoad from "../components/SliderLoad.vue";
import Footer from "../components/Footer.vue";]

import Product from '../services/Product';

export default {
  data(){
    return {
      loading: true,
      products: [
        {id: 2, title: "Gnaise verde tes sdfuishfusdfhsdufhsdufhsdfusdhfusdfhusdfhsdufhsdu", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Flintstones LTDA", quality: "A", material: "Gnaise", createdAt: "2021-02-28 10:23:23"},
        {id: 3, title: "Granito cinza", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Pedro Rocha", quality: "A", material: "Granito", createdAt: "2021-02-08 10:23:23"},
        {id: 4, title: "Gabro rosa", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Erick & Sávio", quality: "A", material: "Gabro", createdAt: "2021-02-08 10:23:23"},
        {id: 5, title: "Quartzito branco", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "João Granitos", quality: "B", material: "Quartzito", createdAt: "2021-02-12 10:23:23"},
        {id: 6, title: "Mármore branco", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Marmoraria Imperial", quality: "A", material: "Mármore", createdAt: "2021-02-08 10:23:23"},
        {id: 7, title: "Ardósia verde", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Iabadaba & CIA", quality: "A", material: "Ardósia", createdAt: "2021-02-08 10:23:23"},
        {id: 8, title: "Xisto rajado", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Stones and Rocks", quality: "C", material: "Xisto", createdAt: "2021-02-08 10:23:23"},
        {id: 9, title: "Gnaise verde", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Flintstones LTDA", quality: "A", material: "Gnaise", createdAt: "2021-02-27 10:23:23"},
        {id: 10, title: "Granito cinza", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Pedro Rocha", quality: "B", material: "Granito", createdAt: "2021-02-08 10:23:23"},
        {id: 11, title: "Gabro Azul", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Erick & Sávio", quality: "A", material: "Gabro", createdAt: "2021-02-08 10:23:23"},
        {id: 12, title: "Quartzito verde", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "João Granitos", quality: "A", material: "Quartzito", createdAt: "2021-02-08 10:23:23"},
        {id: 13, title: "Mármore preto", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Marmoraria Imperial", quality: "C", material: "Mármore", createdAt: "2021-02-28 10:23:23"},
        {id: 14, title: "Ardósia roxa", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Iabadaba & CIA", quality: "A", material: "Ardósia", createdAt: "2021-02-08 10:23:23"},
        {id: 15, title: "Xisto preto", url_image: "https://source.unsplash.com/random", price: 100, quantity: 12, business_name: "Stones and Rocks", quality: "C", material: "Xisto", createdAt: "2021-02-01 10:23:23"},
      ]
    }
  },
  methods: {
    async loadPromo(){
       
    }    
  },
  async created(){
    console.log(this.$store);
    const promo = await this.loadPromo();
    const others = await this.loadProducts();

    this.promo = promo.success ? promo.products : [];
    this.others = other.success ? others.products : [];

    this.loading = false;
  },
  components: {
    Slider,
    Label,
    Footer,
    SliderLoad
  }
}
</script>