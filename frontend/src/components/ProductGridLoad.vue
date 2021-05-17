<template>
  <div class="flex flex-wrap content-start my-8">

        <ProductLoad v-for="index in 20" :key="index" :isGrid="isGrid"/>

  </div>
</template>

<script>
import ProductLoad from "./ProductLoad.vue";

export default {
    props: {
        isGrid: Boolean
    },
    components: {ProductLoad}
};
</script>
