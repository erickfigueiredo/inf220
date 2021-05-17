<template>
    <div class="flex flex-wrap my-8">
        <ProductCard v-for="dt in data" :key="dt.id" :product="dt" :isGrid="true"/>
    </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
    props: {
        data: Array
    },
    components: {ProductCard}
};
</script>
