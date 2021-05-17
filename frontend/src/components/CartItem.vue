<template>
  <div class="w-full my-1 px-1">
    <MessageCardFixed :message="message" :title="title" :type="type" />
    <div class="w-full rounded-lg bg-white overflow-hidden shadow-sm mt-6">
      <div class="flex justify-start">
        <img
          class="h-40 w-3/12 xl:w-2/12 object-cover cursor-pointer"
          @click="openProduct(product.id_product)"
          :src="product.url_image"
          alt="img"
        />
        <div class="px-6 py-4 text-left w-9/12">
          <div class="truncate mt-1">
            <span
              class="font-semibold text-md leading-tight hover:underline cursor-pointer"
              @click="openProduct(product.id_product)"
            >
              {{ product.title }}
            </span>
          </div>
          <div class="mt-3">
            R$<span class="text-3xl mt-4 pt-5">{{ product.price }}</span>
            <span class="float-right"
              ><small class="text-gray-500">Restam {{product.quantity || product.product_quantity}}</small> <br /><input
                type="number"
                @change="updateQuantityToBuy()"
                min="1"
                step="1"
                v-model="quantity"
                class="rounded border mt-1 w-12 ml-2 text-center"
              />
              <br /><small>
                <button
                  type="button"
                  @click="removeItemFromCart(product.id_product)"
                  class="text-gray-500 hover:text-red-600 hover:underline pl-2"
                >
                  Remover
                </button>
              </small></span
            >
          </div>

          <br />
          <router-link
            :to="{path: '/loja/'+product.id_salesman}"
            class="cursor-pointer float-left pt-0 mt-0 text-gray-500 text-sm transition duration-300 hover:text-red-600 uppercase font-semibold tracking-wide"
            ><i class="fas fa-store"></i> {{ product.business_name }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import MessageCardFixed from "../components/MessageCardFixed.vue";

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      quantity: undefined,
      type: "none",
      title: "",
      message: "",
    };
  },
  methods: {
    ...mapActions(["removeItem", "updateQuantity"]),
    setMessage(title, type, message, miliseconds) {
      console.log(type)
      this.message = message;
      this.type = type;
      this.title = title;
      setTimeout(() => {
        console.log(this.type)
        this.type = "none";
      }, miliseconds);
    },
    searchFor(search) {
      this.$router.push({ path: "/busca", query: { search } });
    },
    openProduct(id_product) {
      this.$router.push({ name: "ProductGeneral", params: { id_product } });
    },
    async removeItemFromCart(id_product) {
      const result = await this.removeItem({
        id_product,
        id_item: this.product.id_item ? this.product.id_item : undefined,
      });
    },
    async updateQuantityToBuy() {
      if (this.quantity > this.product.product_quantity || this.quantity < 1) {
        this.setMessage("Erro!", "error", "Quantidade inválida!", 3000);
        this.quantity = this.product.cart_quantity;
        return;
      }
      const result = await this.updateQuantity({
        id_item: this.product.id_item ? this.product.id_item : undefined,
        id_product: this.product.id_product,
        cart_quantity: this.quantity,
      });
      if (result.success)
        this.setMessage("Sucesso!", "success", result.message, 3000);
      else {
        this.setMessage("Erro!", "error", result.message, 3000);
        this.quantity = parseInt(this.product.cart_quantity);
      }
    },
  },
  created() {
    this.quantity = this.product.cart_quantity;
  },
  components: {
    MessageCardFixed,
  },
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>