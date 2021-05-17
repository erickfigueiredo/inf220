<template>
  <div class="my-1 px-1 w-full" :class="{ 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5': isGrid }">
    <div class="w-full rounded-lg bg-white overflow-hidden shadow-sm mt-6">
      <div @click="$router.push({path: '/produto/' + product.id})" class="h-48 cursor-pointer bg-cover w-full bg-center" :style="{ backgroundImage: 'url(' + product.url_image + ')' }">
        <div class="flex justify-end">
          <span v-if="isNew" class="m-2 animate-pulse bg-green-200 text-green-700 text-xs px-2 rounded-full uppercase font-bold tracking-wide">Novo</span>
        </div>
      </div>
      <div class="px-6 py-4 text-left">
        <span class="bg-gray-800 text-white text-xs px-2 rounded-full uppercase font-semibold tracking-wide"> Tipo {{product.quality}} </span>
        <div class="truncate mt-1">
          <span @click="$router.push({path: '/produto/' + product.id})" class="font-semibold text-md leading-tight hover:underline cursor-pointer">{{ product.title }}</span>
        </div>
        <div class="mt-1">
          R$<span class="text-3xl">{{ product.price }}</span>
          <span class="text-gray-600 text-sm"> x{{ product.quantity }}</span>
        </div>
        <div class="mt-1 truncate">
            <router-link :to="{path: '/loja/'+product.id_salesman}" class="text-gray-500 text-xs transition duration-300 hover:text-red-600 uppercase font-semibold tracking-wide cursor-pointer"><i class="fas fa-store "></i> {{ product.business_name }}</router-link>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2 text-center">
        <span
          @click="redirectToSearch(product.material)"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition duration-300 hover:bg-gray-800 hover:text-white cursor-pointer"
          > {{product.material.replace(/(^|\s)\S/g, l => l.toUpperCase())}} </span
        >
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
  }
};
</script>
