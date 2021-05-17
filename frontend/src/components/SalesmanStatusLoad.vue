<template>
  <div class="animate-pulse">
    <div class="h-128 bg-cover bg-center bg-gray-500 rounded-t-lg md:rounded-none">
      <div class="text-center text-white px-6 pt-12 pb-24">
      </div>
    </div>
    <div class="bg-white md:flex rounded-b-lg md:rounded-lg md:mx-6 p-6 -mt-16">
      <div class="w-full">
        <div class="w-3/5 h-5 rounded bg-gray-500"></div>
        <div class="my-2 h-5 rounded bg-gray-500"></div>
        <div class="my-2 h-5 rounded bg-gray-500"></div>
        <div class="my-2 h-5 rounded bg-gray-500"></div>
      </div>
      <div class="w-full md:w-2/3">
        <!-- Graficos ficarão aqui-->
      </div>
    </div>
  </div>
</template>

<style scoped>
    .h-128{
        height: 24rem;
    }
</style>

<script>
export default {
};
</script>