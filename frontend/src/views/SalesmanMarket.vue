<template>
    <div class="min-h-screen flex flex-col">
      <MessageCard :title="title" :message="message" :type="type" />
        <div class="flex-grow px-6 pt-8 pb-2">
            <SalesmanStatus v-if="!loading" :salesman="salesman"/>
            <SalesmanStatusLoad v-if="loading"/>
            <Label id="top" title="Nossos produtos" :type="2" />
            <ProductGrid v-if="!empty && !loading" :data="products" />
            <div
                v-if="empty"
                class="my-16 text-center text-gray-500"
            >
                <span class="text-3xl md:text-4xl lg:text-6xl"><i class="fas fa-search"></i></span>
                <p>Ops! Esse vendedor ainda não possui produtos cadastrados...</p>
            </div>
            <ProductGridLoad v-if="loading" :isGrid="true" />
        </div>
        <Pagination :curPage="parseInt(pagination.currentPage)" v-on:go-to-page="goToPage" :numPages="pagination.lastPage"/>
        <Footer />
    </div>
</template>

<script>
import SalesmanStatus from "../components/SalesmanStatus.vue";
import SalesmanStatusLoad from '../components/SalesmanStatusLoad.vue';
import Label from "../components/Label.vue";
import ProductGrid from "../components/ProductGrid.vue";
import ProductGridLoad from "../components/ProductGridLoad.vue";
import Pagination from "../components/Pagination.vue";
import Footer from "../components/Footer.vue";
import MessageCard from '../components/MessageCardFixed.vue';

import Product from '../services/Product';
import Salesman from '../services/Salesman';

export default {
  data() {
    return {
      salesman: {},
      products: {},
      pagination: {currentPage: 1, lastPage: 1},
      loading: true,
      empty: true,
      id_salesman: undefined,

      title: '',
      message: '',
      type: 'none',
    };
  },
  components: {
    SalesmanStatus,
    SalesmanStatusLoad,
    Label,
    ProductGrid,
    ProductGridLoad,
    Pagination,
    Footer,
    MessageCard
  },
  async created() {
      const id_salesman = this.$route.params.id_salesman;
      this.id_salesman = id_salesman;
      const product = await Product.getSalesmanProduct(id_salesman);
      const salesman = await Salesman.getSalesmanById(id_salesman);
    
      if(salesman.success) {
          this.products = product.product.data || {};
          this.salesman = salesman.salesman;
          this.pagination = product.product.pagination;
      }else{
          this.$router.push('/');
      }
      if(this.products.length) this.empty = false;
      console.log(this.pagination)
      setTimeout(() => this.loading = false, 1000);
  },
  methods: {
    async goToPage(event, page){
      await this.getProductsSalesman(page);
    },
    async getProductsSalesman(page){
      this.loading = true;
      const products = await Product.getSalesmanProduct(this.id_salesman, page || 1);
      if(products.success){
        this.backToTop();
        this.products = products.product.data;
        this.pagination = products.product.pagination;
        this.loading = false;
      }else this.setMessage('Erro!', products.message, 'error', 3000);
    },
    setMessage(title, message, type, time){
      this.title = title;
      this.message = message;
      this.type = type,
      setTimeout(() => {
        this.type = 'none';
      }, time)
    },
    backToTop(){
      this.$smoothScroll({
        scrollTo: document.getElementById('top'),
        duration: 0
      })
    }
  }
};

</script>
