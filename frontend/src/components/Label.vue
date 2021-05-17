<template>
    <div v-if="type == 1" class="flex rounded bg-gray-800 py-4 px-4 justify-center md:justify-start">
        <div class="text-2xl md:text-5xl leading-none">
            <span class="break-words break-all font-light tracking-wide text-white">
                {{title}}
            </span>
        </div>
    </div>

    <div v-else-if="type == 2" class="mt-6 flex rounded  bg-white py-4 px-4 justify-start ">
        <div class="text-md md:text-xl leading-none tracking-tight">
            <span class="break-words break-all text-gray-600">
                {{title}}
            </span>
        </div>
    </div>

    <div v-else class="flex rounded bg-white py-3 px-3 justify-start ">
        <div class="truncate py-1 text-md md:text-xl leading-none tracking-tight">
            <span class="text-gray-600">
                Você pesquisou por: "<b>{{title}}</b>"
            </span>
        </div>
    </div>
    
</template>

<script>
export default {
    props: {
        title: String,
        type: Number,
    }
}
</script>

<style scoped>
.border-especial{
    border-bottom: 2px solid #F6222E;
}
</style>