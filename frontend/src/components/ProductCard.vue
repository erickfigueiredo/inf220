<template>
  <div class="my-1 px-1 w-full" :class="{ 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5': isGrid }">
    <div class="w-full rounded-lg bg-white overflow-hidden shadow-sm mt-6">
      <div @click="$router.push({path: '/produto/' + product.id})" class="h-48 cursor-pointer bg-cover w-full bg-center" :style="{ backgroundImage: 'url(' + 'gallery/'+ product.uri + ')' }">
        <div class="flex justify-end">
          <span v-if="isNew" class="m-2 animate-pulse bg-green-200 text-green-700 text-xs px-2 rounded-full uppercase font-bold tracking-wide">Novo</span>
        </div>
      </div>
      <div class="px-6 py-4 text-left">
        <router-link :to="'/busca?search=' + product.category">
          <span class="bg-gray-800 text-white text-xs px-2 rounded-full uppercase font-semibold tracking-wide"> {{product.category}} </span>
        </router-link>
        <div class="truncate mt-1">
          <span @click="$router.push({path: '/produto/' + product.id})" class="font-semibold text-md leading-tight hover:underline cursor-pointer">{{ product.title }}</span>
        </div>
        <div class="mt-1">
          <small v-if="product.value" style="text-decoration: line-through" class="block ">R$ {{product.price}}</small>
          R$<span class="text-3xl">{{ price }}</span>
          <span class="text-gray-600 text-sm"> x{{ product.quantity }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isNew: false
    }
  },
  props: {
    product: Object,
    isGrid: {
      type: Boolean,
      default: false
    },
  },
  created() {
    const today = new Date();
    const creationDate = new Date(this.product.created_at);
    console.log(this.product)
    if((today.getUTCFullYear() === creationDate.getUTCFullYear())
    && (Math.abs(today.getUTCMonth() - creationDate.getUTCMonth()) <= 1) 
    && (Math.abs(parseInt(today.getUTCDate()) - parseInt(creationDate.getUTCDate())) <= 7)) this.isNew = true; 
  },
  methods: {
    redirectToSearch(search) {
      this.$router.push("/busca?search=" + search);
    }
  },
  computed: {
    price(){
      return this.product.value ? this.product.price - this.product.value : this.product.price
    }
  }
};
</script>
