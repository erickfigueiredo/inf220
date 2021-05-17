<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow px-6 pt-8 pb-2">
      <h1 class="text-2xl lg:text-5xl leading-none mb-10 text-gray-800">
          Carrinho de compras
      </h1>
      <div v-if="!loading" class="flex-grow">
        <template v-for="item in items" :key="item.id">
          <CartItem :product="item" />
        </template>
        <template v-if="!items || !items.length">
          <div class="my-16 text-center text-gray-500">
            <span class="text-3xl md:text-4xl lg:text-6xl"
              ><i class="fas fa-truck-loading"></i
            ></span>
            <p>Você ainda não tem nenhum produto no carrinho...</p>
          </div>
        </template>
        <template v-else>
          <CartSum />
        </template>
      </div>
      <div v-else class="flex-glow">
        <CartItemLoad />
        <CartItemLoad />
        <CartItemLoad />
        <CartItemLoad />
        <CartItemLoad />
        <CartSum />
      </div>
    </div>
    <Pagination v-if="items.length && !loading" v-on:go-to-page="goToPage" :curPage="parseInt(pagination.currentPage)" :numPages="pagination.lastPage"/>
    <Footer />
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import Footer from "../components/Footer.vue";
import CartItem from "../components/CartItem.vue";
import CartSum from "../components/CartSum.vue";
import CartItemLoad from "../components/CartItemLoad.vue";
import { mapActions } from "vuex";
import Product from "../services/Product";

export default {
  components: {
    Pagination,
    Footer,
    CartItem,
    CartSum,
    CartItemLoad,
  },
  data() {
    return {
      loading: true,
      items: Array,

      pagination: {},
      maxPerPage: 5
    };
  },
  async created() {
    if (!this.$store.state.login.login.isLogged) {
      let items = await this.getItems();
      console.log(items)
      this.items = items;
      this.pagination = await this.getCartPagination();
      console.log(this.pagination)
    } else {
      await this.loadCart(1);
      this.items = await this.getItems();
      this.pagination = await this.getCartPagination();
    }
    if(this.$store.state.user.user.type == 'V') return this.$router.push({path: '/'});
    setTimeout(() => (this.loading = false), 1000);
    console.log('ok')
  },
  methods: {
    ...mapActions(["removeItems", "getItems", "loadCart", 'getCartPagination']),
    async goToPage(event, page){
      if(this.$store.state.login.login.isLogged){
        await this.loadCart(page);
        this.items = await this.getItems();
        this.pagination = await this.getCartPagination();
      }else {
        this.items = await this.getItems(page);
        this.pagination = await this.getCartPagination();
      }
    }
  },
  watch: {
    async "$store.state.cart.cart"(cart) {
      this.items = cart;
      this.pagination = await this.getCartPagination();
    },
  },
};
</script>
