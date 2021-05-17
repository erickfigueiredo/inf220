<template>
  <div>
    <div class="img-mkt bg-cover bg-center rounded-t-lg md:rounded-none">
      <div class="text-center text-white px-6 pt-12 pb-24">
        <p>
          <span class="text-5xl"><i class="fas fa-store"></i></span>
        </p>
        <p class="text-3xl md:text-4xl lg:text-6xl mb-4">Seja bem-vindo!</p>
        <p class="text-2xl md:text-3xl lg:text-4xl mb-4">
          {{salesman.business_name}}
        </p>
      </div>
    </div>
    <div class="bg-white md:flex rounded-b-lg md:rounded-lg md:mx-6 p-6 -mt-16">
      <div class="w-full text-gray-600">
        <p class="font-bold">Informações sobre a loja</p>
        <p class="my-2">Nome do negócio: {{ salesman.business_name }}</p>
        <p class="my-2">CNPJ: {{ mCNPJ(salesman.cnpj) }}</p>
        <p class="my-2">Entrou em: {{ formatDate(salesman.created_at) }}</p>
      </div>
      <div class="w-full md:w-2/3">
        <!-- Graficos ficarão aqui-->
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-mkt {
  background-image: url("https://system-photos.s3-sa-east-1.amazonaws.com/market.jpg");
}
</style>

<script>
export default {
  props: {
    salesman: Object,
  },
  components: {},
  methods: {
    formatDate(date) {
      let dateParts = date.split("T")[0].split("-");
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    },
    mCNPJ(cnpj) {
      cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
      cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
      cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
      return cnpj;
    },
  },
};
</script>