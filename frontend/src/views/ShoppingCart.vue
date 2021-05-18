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
          <div class="bg-gray-800 mt-12 p-6 rounded-lg">
    <div class="flex-none md:flex">
      <div class="w-full md:w-3/5">
        <p class="font-semibold text-2xl md:text-3xl text-white">Total:</p>
      </div>
      <div class="w-full md:w-2/5 text-right text-gray-600">
        <p class="text-white">R$ <span class="text-2xl md:text-3xl">{{total.toFixed(2)}}</span></p>
        <p>à vista no débito ou <span @click="juros = !juros" class="transition duration-300 hover:text-blue-600 cursor-pointer transi">em até 12x sem juros</span></p>
        <div v-if="juros" class="flex-none md:flex">
          <div class="w-full md:w-1/2">
            <p>1x: R$ {{parseFloat(total.toFixed(2))}}</p>
            <p>2x: R$ {{ parseFloat(total / 2).toFixed(2) }}</p>
            <p>3x: R$ {{ parseFloat(total / 3).toFixed(2) }}</p>
            <p>4x: R$ {{ parseFloat(total / 4).toFixed(2) }}</p>
            <p>5x: R$ {{ parseFloat(total / 5).toFixed(2) }}</p>
            <p>6x: R$ {{ parseFloat(total / 6).toFixed(2) }}</p>
          </div>
          <div class="w-full md:w-1/2">
            <p>7x: R$ {{ parseFloat(total / 7).toFixed(2) }}</p>
            <p>8x: R$ {{ parseFloat(total / 8).toFixed(2) }}</p>
            <p>9x: R$ {{ parseFloat(total / 9).toFixed(2) }}</p>
            <p>10x: R$ {{ parseFloat(total / 10).toFixed(2) }}</p>
            <p>11x: R$ {{ parseFloat(total / 11).toFixed(2) }}</p>
            <p>12x: R$ {{ parseFloat(total / 12).toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mt-12">
      <button
        type="submit"
        class="w-full transition duration-150 py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white font-bold border-b-4 border-blue-800 focus:outline-none rounded"
      >
        Comprar    
      </button>
    </div>
  </div>
      </div>
      <div v-else class="flex-glow">
        <CartItemLoad />
        <CartItemLoad />
        <CartItemLoad />
        <CartItemLoad />
        <CartItemLoad />
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import CartItem from "../components/CartItem.vue";
import CartItemLoad from "../components/CartItemLoad.vue";
import Product from "../services/Product";
import Cart from "../services/Cart";

export default {
  components: {
    Footer,
    CartItem,
    CartItemLoad,
  },
  data() {
    return {
      loading: true,
      items: Array,
      juros: false,

      total: 10,
    };
  },
  async created() {
    let items = window.localStorage.getItem("cart")
      ? JSON.parse(window.localStorage.getItem("cart"))
      : [];
    this.items = items;
    this.total = 0;
    for (const item of items) {
      this.total += item.cart_quantity * parseFloat(item.price);
    }
    console.log(this.total);
    this.loading = false;
  },
};
</script>
