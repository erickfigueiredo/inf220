<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="isOpen = false"
      class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
    ></div>
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-800 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 rounded-r-lg lg:rounded-none"
    >
      <div class="flex items-center justify-center mt-8">
        <router-link to="/">
          <div
            class="flex justify-center items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <span class="text-blue-600 font-semibold text-2xl">El Comprador</span>
          </div>
        </router-link>
      </div>

      <!-- Home -->
      <nav class="mt-10">
        <div class="px-6" v-if="$route.name === 'ProductSearch'">
          <div class="text-gray-500 mb-2">
            <span class="h-5 w-5">
              <i class="fas fa-sliders-h"></i>
            </span>
            <span class="mx-4"> Filtros de pesquisa </span>
          </div>
          <form>
            <label class="text-gray-500 mb-1">Preço</label>
            <div class="flex">
              <input
                type="number"
                v-model="filters.min_price"
                class="my-2 py-1 px-2 w-1/2 mr-1 rounded-md bg-gray-700 text-gray-500"
                placeholder="Min"
              />
              <input
                type="number"
                v-model="filters.max_price"
                class="my-2 py-1 px-2 w-1/2 ml-1 rounded-md bg-gray-700 text-gray-500"
                placeholder="Máx"
              />
            </div>
            <label class="text-gray-500 mb-1">Categoria</label>
            <div class="flex">
              <input
                v-model="filters.category"
                class="my-2 py-1 px-2 w-full mr-1 rounded-md bg-gray-700 text-gray-500"
                type="text"
                placeholder="Nome"
              />
            </div>
            <button
              type="button"
              @click="filterSearch()"
              class="transition duration-150 py-1 px-2 bg-blue-600 hover:bg-blue-800 text-white font-bold border-b-4 border-blue-800 focus:outline-none rounded w-full"
            >
              Aplicar
            </button>
          </form>
        </div>
        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Home' ? activeClass : inactiveClass]"
          to="/"
        >
          <span class="h-5 w-5">
            <i class="fas fa-home"></i>
          </span>
          <span class="mx-4"> Início </span>
        </router-link>

        <!-- Painel de controle -->
        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]"
          to="/dashboard"
        >
          <span class="h-5 w-5">
            <i class="fas fa-tachometer-alt"></i>
          </span>
          <span class="mx-4"> Painel de controle </span>
        </router-link>

        <!-- Perfil -->
        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Profile' ? activeClass : inactiveClass]"
          to="/perfil"
        >
          <span class="h-5 w-5">
            <i class="fas fa-address-card"></i>
          </span>
          <span class="mx-4"> Perfil </span>
        </router-link>

        <!-- Compras -->
        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Order' ? activeClass : inactiveClass]"
          to="/perfil"
        >
          <span class="h-5 w-5">
            <i class="fas fa-shopping-basket"></i>
          </span>
          <span class="mx-4"> Compras </span>
        </router-link>

        <!-- Avaliações -->
        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Avaliation' ? activeClass : inactiveClass]"
          to="/perfil"
        >
          <span class="h-5 w-5">
            <i class="fas fa-quote-right"></i>
          </span>
          <span class="mx-4"> Suas avaliações </span>
        </router-link>
        
        <!-- Mensagens -->
        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'HubMessage' ? activeClass : inactiveClass]"
          to="/central-mensagens"
        >
          <span class="h-5 w-5">
            <i class="fas fa-comment-dots"></i>
          </span>
          <span class="mx-4"> Central de Mensagens </span>
        </router-link>

        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'UIElements' ? activeClass : inactiveClass]"
          to="/ui-elements"
        >
          <svg
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
              fill="currentColor"
            />
            <path
              d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
              fill="currentColor"
            />
            <path
              d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
              fill="currentColor"
            />
            <path
              d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
              fill="currentColor"
            />
          </svg>

          <span class="mx-4">UI Elements</span>
        </router-link>

        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Tables' ? activeClass : inactiveClass]"
          to="/tables"
        >
          <svg
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H7Z"
              fill="currentColor"
            />
            <path
              d="M4 7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H5C4.44772 8 4 7.55228 4 7Z"
              fill="currentColor"
            />
            <path
              d="M2 11C2 9.89543 2.89543 9 4 9H16C17.1046 9 18 9.89543 18 11V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V11Z"
              fill="currentColor"
            />
          </svg>

          <span class="mx-4">Tables</span>
        </router-link>

        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Forms' ? activeClass : inactiveClass]"
          to="/forms"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            />
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="mx-4">Forms</span>
        </router-link>

        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Cards' ? activeClass : inactiveClass]"
          to="/cards"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            />
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="mx-4">Cards</span>
        </router-link>

        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Modal' ? activeClass : inactiveClass]"
          to="/modal"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
            />
          </svg>

          <span class="mx-4">Modal</span>
        </router-link>

        <router-link
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'Blank' ? activeClass : inactiveClass]"
          to="/blank"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
            />
          </svg>

          <span class="mx-4">Blank</span>
        </router-link>
      </nav>
    </div>
    <MessageCardFixed :type="type" :title="title" :message="message" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useSidebar } from "../hooks/useSidebar";
import MessageCardFixed from "../components/MessageCardFixed.vue";
import { mapActions, mapMutations } from "vuex";

export default defineComponent({
  setup() {
    const { isOpen } = useSidebar();
    const activeClass = ref(
      "bg-gray-600 bg-opacity-25 text-gray-100 border-blue-600"
    );
    const inactiveClass = ref(
      "border-gray-800 text-gray-500 hover:bg-gray-600 hover:border-gray-600 hover:bg-opacity-25 hover:text-gray-100"
    );

    return {
      isOpen,
      activeClass,
      inactiveClass,
    };
  },
  data() {
    return {
      filters: {
        min_price: "",
        max_price: "",
        category: ""
      },
      type: "none",
      message: "",
      title: "",
    };
  },
  methods: {
    ...mapMutations(["setSearch", "setFilters", "resetSearch"]),
    ...mapActions(["search"]),
    async filterSearch() {
      let data = {};
      const localFilters = this.filters;
      Object.keys(localFilters).map(function (key, index) {
        localFilters[key] != "" ? (data[key] = localFilters[key]) : undefined;
      });

      this.setFilters(data)

      await this.search(data);
      this.message = "Filtros Aplicados!";
      this.title = "Sucesso!";
      this.type = "success";

      setTimeout(() => {
        this.type = "none";
      }, 3000);
    },
  },
  components: {
    MessageCardFixed,
  },
});
</script>
<style>
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>