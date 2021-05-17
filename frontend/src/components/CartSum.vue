<template>
  <div class="bg-gray-800 mt-12 p-6 rounded-lg">
    <div class="flex-none md:flex">
      <div class="w-full md:w-3/5">
        <p class="font-semibold text-2xl md:text-3xl text-white">Total:</p>
      </div>
      <div class="w-full md:w-2/5 text-right text-gray-600">
        <p class="text-white">R$ <span class="text-2xl md:text-3xl">{{total}}</span></p>
        <p>à vista no boleto ou <span @click="juros = !juros" class="transition duration-300 hover:text-red-600 cursor-pointer transi">em até 12x sem juros</span></p>
        <div v-if="juros" class="flex-none md:flex">
          <div class="w-full md:w-1/2">
            <p>1x: R$ {{total}}</p>
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
        class="w-full transition duration-150 py-2 px-4 bg-red-600 hover:bg-red-800 text-white font-bold border-b-4 border-red-800 focus:outline-none rounded"
      >
        Comprar    
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      juros: false,
      total: 0,
      items: Array,
      loading: true,
    };
  },
  methods: {
    ...mapMutations(["setItems"]),
    ...mapActions([
      "removeItems",
      "getItems"
    ]),
    async loadPrice() {
      this.total = 0;
      for (let item of this.items) {
        this.total +=
          parseInt(item.cart_quantity) * parseFloat(item.price);
      }
      this.total = this.total.toFixed(2).toLocaleString("pt-BR");
    },
  },
  watch: {
    "$store.state.cart.cart"(newItem) {
      this.items = this.$store.state.cart.cart;
      this.items ? this.loadPrice() : undefined;
    },
  },
  async created() {
    this.items = await this.getItems();
    this.items ? this.loadPrice() : undefined;
  },
  computed: {
    parcels(value){
      return parseFloat(value).toFixed(2);
    }
  }
};
</script>

<style scoped>
</style>