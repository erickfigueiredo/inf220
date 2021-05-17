<template>
  <div class="my-1 px-1" :class="{ 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5': isGrid }">
    <div class="w-full rounded-lg bg-white overflow-hidden shadow-sm mt-6">
      <img class="h-48 object-cover w-full" :src="product.url_image" :alt="product.title" />

      <div class="px-6 py-4 text-left">
        <span class="inline-block bg-green-200 text-green-700 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
          Novo
        </span>
        <div class="mt-1 font-semibold text-md leading-tight">
          {{ product.title }}
        </div>
        <div class="mt-1">
          R$<span class="text-3xl">{{ product.price }}</span>
          <span class="text-gray-600 text-sm"> x{{ product.quantity }}</span>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2 text-center">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition duration-300 hover:bg-gray-800 hover:text-white cursor-pointer"
          >{{ product.category }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    isGrid: {
      type: Boolean,
      default: false
    }
  }
};
</script>