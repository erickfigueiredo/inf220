<template>
  <div id="top" class="min-h-screen flex flex-col">
    <div class="flex-grow px-6 pt-8 pb-2">
      <ProductDetailsLoading v-if="loading" />
      <ProductDetails v-else :stock="inStock" :product="product" :salesman="salesman" />
      <ProductAvaliation />
    </div>
    <Footer />
  </div>
</template>

<script>
import ProductDetails from "../components/ProductDetails.vue";
import ProductAvaliation from "../components/ProductAvaliation.vue";
import ProductDetailsLoading from "../components/ProductDetailsLoading.vue";
import Footer from "../components/Footer.vue";
import Product from "../services/Product";

export default {
  components: {
    ProductDetailsLoading,
    ProductAvaliation,
    ProductDetails,
    Footer
  },
  data() {
    return {
      product: Object,
      salesman: Object,
      loading: true,
      inStock: true,
    };
  },
  async created() {
    const id_product = this.$route.params.id_product;
    const product = await Product.getProductById(id_product);
    product.success ? (this.product = product.product) : this.$router.push("/");
    if(product.product.quantity <= 0 || !product.product.is_active || product.product.is_deleted  ) this.inStock = false;

    const salesman = await Salesman.getSalesmanById(this.product.id_salesman);
    salesman.success
      ? (this.salesman = salesman.salesman)
      : this.$router.push("/");
  
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    async backToTop(id){
      await this.$smoothScroll({
        scrollTo: document.getElementById('top'),
        duration: 50
      })
    }
  },
};
</script>
