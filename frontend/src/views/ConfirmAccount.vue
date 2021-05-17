<template>
  <div class="flex justify-center items-center h-screen bg-gray-800 px-6">
    <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
      <div class="flex justify-center items-center">
        <img class="h-8 w-8 mr-1" src="/iStones-Logo.svg" alt="iStones" />
        <span class="text-red-600 font-semibold text-2xl">Stones</span>
      </div>
      <div class="mb-1 mt-10">
        <p
          v-if="!confirmed"
          class="block fontme text-gray-500 text-base text-center"
        >
          Confirmando sua conta...
        </p>
        <p
          v-else-if="confirmed === true"
          class="block fontme text-gray-500 text-base text-center"
        >
          Conta confirmada!
        </p>
        <p
          v-else-if="confirmed == 'fail'"
          class="block fontme text-gray-500 text-base text-center"
        >
          Houve um erro!
        </p>
      </div>

      <div class="mb-1">
        <p
          v-if="confirmed === true"
          class="block fontme text-gray-500 text-base text-center"
        >
          Conta confirmada com sucesso! Faça
          <router-link
            class="block text-sm fontme text-gray-500 hover:text-red-700 hover:underline text-center mt-2"
            to="/login"
            >login</router-link
          >
        </p>
        <p
          v-if="confirmed == 'fail'"
          class="block fontme text-gray-500 text-base text-center"
        >
          Houve um erro ao confirmar a conta! Tente novamente
        </p>
      </div>
      <p class="text-center text-gray-500 text-xs mt-10">
        &copy;2020 iStones | All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import router from "../router.js";
import MessageCard from "../components/MessageCard.vue";
import Login from "../services/Login";

export default defineComponent({
  data() {
    return {
      confirmed: false,

      type: "none",
      message: "",
      title: "",
    };
  },
  created: async function () {
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
      let query = Object.assign({}, this.$route.query);
      delete query.token;
      this.$router.replace({ query });
    } else this.$router.push({ path: "/login" });

    const result = await Login.confirmEmail(this.token);
    if (result.success) {
      this.message = result.message;
      this.title = "Sucesso!";
      this.type = "success";
      this.confirmed = true;
    } else {
      this.message = result.message;
      this.title = "Erro";
      this.type = "error";
      this.confirmed = 'fail'
    }
    setTimeout(() => {
      this.type = "none";
    }, 3000);
  },
  components: {
    MessageCard,
  },
});
</script>
