<template>
  <img class="h-64 object-cover w-full" :src="banner.url_image"/>
</template>

<script>
export default {
    props: {
        banner: Object
    }
}
</script>