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
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import CartItem from "../components/CartItem.vue";
import CartSum from "../components/CartSum.vue";
import CartItemLoad from "../components/CartItemLoad.vue";
import Product from "../services/Product";
import Cart from "../services/Cart";

export default {
  components: {
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
      maxPerPage: 5,
    };
  },
  async created() {
    let items = window.localStorage.getItem("cart")
      ? JSON.parse(window.localStorage.getItem("cart"))
      : [];
    this.items = items;
    console.log(items);
    this.loading = false;
  },
};
</script>
