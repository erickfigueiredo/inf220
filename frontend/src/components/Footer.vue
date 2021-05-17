<template>
    <div>
        <div class="w-full text-center text-white bg-gray-800 p-10 mt-5 inset-x-0 bottom-0 px-0">
            <p align="center"><img class="object-center w-8 mb-2" src="/iStones-Logo.svg"><b>iStones</b> Pedras Ornamentais <span class="text-red-600">{{year}}</span></p>
            <p class="text-xs">CNPJ: 00.0000/0000-00</p>         
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