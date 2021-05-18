<template>
  <div class="w-full my-1 px-1">
    <MessageCardFixed :message="message" :title="title" :type="type" />
    <div class="w-full rounded-lg bg-white overflow-hidden shadow-sm mt-6">
      <div class="flex justify-start">
        <img
          class="h-40 w-3/12 xl:w-2/12 object-cover cursor-pointer"
          @click="openProduct(product.id)"
          :src="'gallery/' + product.uri"
          alt="img"
        />
        <div class="px-6 py-4 text-left w-9/12">
          <div class="truncate mt-1">
            <span
              class="font-semibold text-md leading-tight hover:underline cursor-pointer"
              @click="openProduct(product.id)"
            >
              {{ product.title }}
            </span>
          </div>
          <div class="mt-3">
            R$<span class="text-3xl mt-4 pt-5">{{ product.price }}</span>
            <span class="float-right"
              ><small class="text-gray-500"
                >Restam
                {{ product.quantity || product.product_quantity }}</small
              >
              <br /><input
                type="number"
                @change="updateQuantityToBuy(product.id)"
                min="1"
                step="1"
                v-model="quantity"
                class="rounded border mt-1 w-12 ml-2 text-center"
              />
              <br /><small>
                <button
                  type="button"
                  @click="removeItemFromCart(product.id)"
                  class="text-gray-500 hover:text-blue-600 hover:underline pl-2"
                >
                  Remover
                </button>
              </small></span
            >
          </div>

          <br />
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
    setMessage(title, type, message, miliseconds) {
      console.log(type);
      this.message = message;
      this.type = type;
      this.title = title;
      setTimeout(() => {
        console.log(this.type);
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
      let items = JSON.parse(window.localStorage.getItem("cart"));
      items = items.filter((item) => item.id != id_product);
      window.localStorage.setItem("cart", JSON.stringify(items));
      document.location.reload();
    },
    async updateQuantityToBuy(idProduct) {
      let items = JSON.parse(window.localStorage.getItem("cart"));
      items = items.map((item) => {
        if (item.id == idProduct) {
          item.cart_quantity = parseInt(this.quantity)
        }
        return item
      });
      window.localStorage.setItem("cart", JSON.stringify(items));
      document.location.reload();
    },
  },
  created() {
    this.quantity = this.product.cart_quantity;
    console.log(this.product);
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