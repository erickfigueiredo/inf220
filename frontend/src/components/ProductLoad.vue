<template>
  <div class="my-1 w-full px-1 text-left animate-pulse" :class="{ 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5': isGrid }">
    <div class="w-full rounded-lg bg-white overflow-hidden shadow-lg mt-6">
      <div style="height: 15vh" class="bg-gray-400 rounded w-full"></div>

      <div class="container">
        <div class="mx-5 h-4 bg-gray-400 rounded w-1/3 mt-4"></div>
        <div class="mx-5 h-4 bg-gray-400 rounded w-2/3 mt-2"></div>
        <div class="mx-5 h-6 bg-gray-400 rounded w-2/3 mt-2"></div>
        <div class="mx-5 h-4 bg-gray-400 rounded w-2/3 mt-2"></div>
        <div align="center" class="w-full mb-5">
          <div class="h-4 bg-gray-400 rounded w-1/3 mt-5"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isGrid: Boolean,
  },
};
</script>

<style></style>
