<template>
  <div class="flex justify-center items-center h-screen bg-gray-800 px-6">
    <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
      <div class="flex justify-center items-center">
        <img class="h-8 w-8 mr-1" src="/iStones-Logo.svg" alt="iStones" />
        <span class="text-red-600 font-semibold text-2xl">Stones</span>
      </div>
      <form class="mt-4" @submit.prevent="savePassword">
        <div class="mb-1">
          <label
            class="block text-gray-600 text-sm font-bold mb-2"
            for="password"
          >
            Nova Senha
          </label>
          <input id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Confirme a nova senha"
            minlength="8"
            required
            v-model="password"
            class="text-sm sm:text-sm w-full border rounded text-gray-600 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 px-4"/>
        </div>
        <div class="mb-1">
          <label
            class="block text-gray-600 text-sm font-bold mb-2"
            for="newPassword"
          >
            Confirme a nova senha
          </label>
          <input id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Confirme a nova senha"
            minlength="8"
            required
            v-model="newPassword"
            @keyup="verifyPassword()"
            class="text-sm sm:text-sm w-full border rounded text-gray-600 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 px-4"/>
          <small :hidden="passwordMissMatch" class="text-red-600"
            >Senha diferentes!</small
          >
        </div>
        <div class="mt-6">
          <button
            :disabled="!passwordMissMatch"
            type="submit"
            class="transition duration-150 py-2 px-4 bg-red-600 hover:bg-red-800 text-white font-bold border-b-4 border-red-800 focus:outline-none rounded w-full"
          >
            Alterar a senha
          </button>
          <MessageCard :type="type" :message="message" :title="title" />
          <router-link class="block text-sm fontme text-gray-500 hover:text-red-700 hover:underline text-center mt-2" to="/login">Fazer login</router-link>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs mt-10">
        &copy;2020 iStones | All rights reserved.
      </p>
    </div>
    <div></div>
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
      passwordMissMatch: false,

      password: "",
      newPassword: "",
      token: "",

      type: "none",
      message: "",
      title: "",
    };
  },
  methods: {
    async savePassword() {
      const result = await Login.confirmRecoverPassword(this.token, this.newPassword);
      if (result.success) {
        this.type = "success";
        this.message = result.message;
        this.title = "Sucesso!";
      }else{
        this.type = "error";
        this.message = result.message;
        this.title = "Erro!";
      }
      setTimeout(() => {
          this.type = "none";
        }, 3000);
    },
    verifyPassword() {
      if (this.password != this.newPassword) this.passwordMissMatch = false;
      else this.passwordMissMatch = true;
    },
  },
  components: {
    MessageCard,
  },
  created: function () {
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
      let query = Object.assign({}, this.$route.query);
      delete query.token;
      this.$router.replace({ query });
    } else this.$router.push({ path: "/login" });
  },
});
</script>
