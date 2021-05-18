<template>
  <div class="mt-12 mb-2 px-6 w-full">
    <div
      class="flex w-full rounded bg-white py-4 px-4 justify-center md:justify-end"
    >
      <div class="flex mr-4">
        <a
          @click="curPage - 1 > 0 ? goToPage($event, curPage - 1) : undefined"
          :class="{ 'opacity-50': curPage - 1 <= 0 }"
          class="cursor-pointer py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-500 border-r-0 ml-0 rounded-l transition duration-300 hover:bg-blue-600 hover:text-white"
          ><span>Anterior</span></a
        >
        <a
          v-if="curPage - 3 > 0"
          class="py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-500 transition duration-300"
          ><span>...</span></a
        >
        <a
          @click="goToPage($event, curPage - 2)"
          v-if="curPage - 2 > 0"
          class="cursor-pointer py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-500 border-r-0 ml-0 transition duration-300 hover:bg-blue-600 hover:text-white"
          ><span>{{ curPage - 2 }}</span></a
        >
        <a
          @click="goToPage($event, curPage - 1)"
          v-if="curPage - 1 > 0"
          class="cursor-pointer py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-500 border-r-0 ml-0 transition duration-300 hover:bg-blue-600 hover:text-white"
          ><span>{{ curPage - 1 }}</span></a
        >
        <a
          class="cursor-pointer hover py-2 px-3 leading-tight bg-blue-600 border border-gray-200 text-white border-r-0 ml-0 transition duration-300"
          ><span>{{ curPage }}</span></a
        >
        <a
          @click="goToPage($event, curPage + 1)"
          v-if="curPage + 1 <= numPages"
          class="cursor-pointer py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-500 border-r-0 ml-0 transition duration-300 hover:bg-blue-600 hover:text-white"
          ><span>{{ curPage + 1 }}</span></a
        >
        <a
          @click="goToPage($event, curPage + 2)"
          v-if="curPage + 2 <= numPages"
          class="cursor-pointer py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-500 border-r-0 ml-0 transition duration-300 hover:bg-blue-600 hover:text-white"
          ><span>{{ curPage + 2 }}</span></a
        >
        <a
          v-if="curPage + 3 <= numPages"
          class="py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-500 transition duration-300"
          ><span>...</span></a
        >
        <a
          @click="
            curPage + 1 <= numPages ? goToPage($event, curPage + 1) : undefined
          "
          :class="{ 'opacity-50': curPage + 1 > numPages }"
          class="cursor-pointer py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-500 rounded-r transition duration-300 hover:bg-blue-600 hover:text-white"
          ><span>Próximo</span></a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    numPages: Number,
    curPage: Number,
  },
  data() {
    return {};
  },
  methods: {
    goToPage(event, page){
      this.$emit('go-to-page', event, page);
    },
  },
  created(){
      console.log(this.numPages, this.curPage)
    }
};
</script>
