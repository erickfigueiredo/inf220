<template>
    <div>
        <div class="w-full text-center text-white bg-gray-800 p-10 mt-5 inset-x-0 bottom-0 px-0">
            <p align="center"><b>El Comprador</b> <span class="text-blue-600">{{year}}</span></p>
            <p class="text-xs">CNPJ: DON'T TREAD ON ME</p>         
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            year: "Ano atual"
        }
    },
    created(){
        const date = new Date();
        this.year = date.getFullYear();
    }
}
</script>