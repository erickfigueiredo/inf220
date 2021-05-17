<template>
  <div class="flex justify-center items-center h-screen bg-gray-800 px-6">
    <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md my-10">
      <div class="flex justify-center items-center">
        <img class="h-8 w-8 mr-1" src="/iStones-Logo.svg" alt="iStones" />
        <span class="text-red-600 font-semibold text-2xl">Stones</span>
      </div>
      <form class="mt-4" @submit.prevent="go">
        <div class="mb-4 mt-10">
          <label class="block text-gray-600 text-sm font-bold mb-2" for="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            required
            v-model="email"
            class="text-sm sm:text-sm w-full border rounded text-gray-600 placeholder-gray-700 focus:border-red-600 focus:outline-none py-2 px-4"
          />
        </div>

        <div class="mb-1">
          <label
            class="block text-gray-600 text-sm font-bold mb-2"
            for="password"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="**********"
            minlength="8"
            required
            v-model="password"
            class="text-sm sm:text-sm w-full border rounded text-gray-600 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 px-4"
          />
        </div>

        <div class="flex justify-end items-center">
          <div>
            <router-link
              class="block text-sm fontme text-gray-500 hover:text-red-700"
              to="/recuperar-senha"
              >Esqueceu a senha?</router-link
            >
          </div>
        </div>

        <MessageCard :type="type" :message="message" :title="title" />

        <div class="mt-6">
          <button
            type="submit"
            class="inline-flex justify-center items-center transition duration-150 py-2 px-4 bg-red-600 hover:bg-red-800 text-white font-bold border-b-4 border-red-800 focus:outline-none rounded w-full"
          >
            <svg
              class="h-5 w-5 mr-2 text-white animate-spin"
              v-if="loading"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Entrar
          </button>
        </div>

        <div class="flex justify-center items-center mt-4">
          <div>
            <router-link
              class="block text-sm fontme text-gray-500 hover:text-red-700 hover:underline"
              to="/cadastrar"
              >Cadastrar</router-link
            >
          </div>
        </div>
      </form>
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
import { mapActions } from "vuex";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",

      type: "none",
      message: "",
      title: "",

      loading: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async go() {
      this.loading = true;
      const result = await this.login({
        email: this.email,
        password: this.password,
      });
      if (result.success) {
        router.push("/");
      } else {
        if (result.status == 403)
          this.$router.push({
            path: "confirme",
            query: { id: result.id_user },
          });
        this.message = result.message;
        this.title = "Erro";
        this.type = "error";
        setTimeout(() => {
          this.type = "none";
        }, 3000);
      }
      this.loading = false;
    },
  },
  components: {
    MessageCard,
  },
});
</script>
