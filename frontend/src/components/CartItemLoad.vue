<template>
  <div class="w-full my-1 px-1">
    <div class="animate-pulse w-full rounded-lg bg-white overflow-hidden shadow-sm mt-5">
      <div class="flex justify-start">
        <div class="h-40 w-3/12 xl:w-2/12 object-cover bg-gray-500"></div>
        <div class="px-6 mt-2 py-4 text-left w-9/12">
          <div class="bg-gray-500 h-5 rounded mt-1 mb-5"></div>
          <div class="bg-gray-500 h-8 w-2/5 rounded mt-5"></div>
          <div class="bg-gray-500 h-5 w-1/5 rounded mt-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style scoped>
</style>