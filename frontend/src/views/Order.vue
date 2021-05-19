<template>
  <div v-if="!loading" class="my-1 px-1 w-full">
    <div class="w-full rounded-lg bg-white overflow-hidden shadow-sm mt-6">
      <div class="px-6 py-4 text-left">
        <h1 class="font-semibold text-xl leading-none mb-10 text-gray-800 mt-5">
          Pedido #{{ order.id }}
        </h1>
        <template v-for="item in prods" :key="item.id">
          <CartItem :product="item" />
          <hr class="my-5" />
        </template>
      </div>
    </div>
    <div class="bg-gray-800 mt-5 rounded-lg p-6">
    <div class="flex-none md:flex bg-gray-800 mt-5 rounded-lg pt-6">
        <div class="w-full md:w-3/5">
          <p class="font-semibold text-xl text-white">Pedido</p>
        </div>
        <div class="w-full md:w-2/5 text-right text-gray-600">
          <p class="text-white">
            R$ <span class="text-2xl md:text-3xl">{{ order.order_total }}</span>
          </p>
        </div>
      </div>
      <div class="flex-none md:flex bg-gray-800 mt-5 rounded-lg pb-6">
        <div class="w-full md:w-3/5">
          <p class="font-semibold text-xl text-white">Frete</p>
        </div>
        <div class="w-full md:w-2/5 text-right text-gray-600">
          <p class="text-white">
            R$ <span class="text-2xl md:text-3xl">{{ order.shipping }}</span>
          </p>
        </div>
      </div>
      <hr class="my-5" />
      <div class="flex-none md:flex bg-gray-800 mt-5 rounded-lg pb-6">
        <div class="w-full md:w-3/5">
          <p class="font-semibold text-xl text-white">Total</p>
        </div>
        <div class="w-full md:w-2/5 text-right text-gray-600">
          <p class="text-white">
            R$ <span class="text-2xl md:text-3xl">{{ (parseFloat(order.shipping) + parseFloat(order.order_total)).toFixed(2) }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Order from "../services/Order";
import Product from "../services/Product";
import CartItem from "../components/CartItem.vue";

export default {
  components: {
    CartItem,
  },
  data() {
    return {
      order: {},
      loading: true,
      prods: {},
    };
  },
  async created() {
    const order = await Order.getOrderByIdClient(6);
    if (!order.success) return this.$router.push("/");
    this.order = order.order.filter(
      (_order) => _order.id == this.$route.params.id_pedido
    )[0];
    console.log(this.order);

    let prods = [];

    for (let orderProduct of this.order.orderProducts) {
      const aux = await Product.getProductById(orderProduct.id_product);
      aux.success
        ? prods.push({ ...aux.product, quantity: orderProduct.quantity })
        : undefined;
    }
    this.prods = prods;
    this.loading = false;
  },
};
</script>

<style>
</style>