<template>
  <header
    class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-red-600"
  >
    <MessageCard :type="type" :title="title" :message="message" />
    <div class="flex items-center">
      <button
        @click="isOpen = true"
        class="text-gray-500 focus:outline-none lg:hidden"
      >
        <i class="fas fa-bars"></i>
      </button>

      <div class="relative mx-4 lg:mx-">
        <form action="" @submit.prevent="searching">
          <input
            class="text-gray-700 form-input rounded-full pl-4 pr-10 focus:shadow-none focus:border-red-600 shadow-inner"
            type="search"
            id="search"
            name="search"
            @keyup="keyMonitor"
            placeholder="Estou procurando por..."
            v-model="search"
          />
          <button type="submit">
            <span
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              <i class="fas fa-search"></i>
            </span>
          </button>
        </form>
      </div>
    </div>

    <div class="flex items-center">
      <button
        class="flex mx-2 lg:mx-4 text-gray-500 focus:outline-none transition duration-300 hover:text-red-600"
      >
        <i class="far fa-bell"></i>
      </button>
      <router-link
        to="/carrinho"
        v-if="userType != 'V'"
      >
        <span class="mx-2 lg:mx-4 text-gray-500 focus:outline-none transition duration-300 hover:text-red-600">
          <span class="relative top-0 left-0 mr-1 text-right bg-gray-300 text-gray-600 text-xs px-2 rounded-full uppercase font-bold tracking-wide"> {{cartQuantity}} </span>
          <i class="fas fa-truck-loading"></i>
        </span>
      </router-link>

      <div class="relative mx-2 lg:mx-4">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none bg-red-600 text-white transition duration-300 hover:bg-gray-500"
        >
          <i class="far fa-user-circle"></i>
        </button>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 h-full w-full z-10"
        ></div>

        <div
          v-show="dropdownOpen"
          class="absolute right-0 mt-2 py-2 w-48 bg-gray-100 rounded-md shadow-xl z-20"
        >
          <span class="block px-4 py-2 text-sm text-gray-700"
            ><b>{{ firstName }}</b></span
          >
          <div v-if="logged">
            <router-link
              to="/perfil"
              class="block px-4 py-2 text-sm text-gray-700 transition duration-300 hover:bg-gray-500 hover:text-white"
              >Perfil</router-link
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 transition duration-300 hover:bg-gray-500 hover:text-white"
              >Configurações</a
            >
            <router-link
              to="/login"
              @click="log"
              class="block px-4 py-2 text-red-600 text-sm transition duration-300 hover:bg-red-600 hover:text-white"
              >Sair</router-link
            >
          </div>
          <router-link
            to="/login"
            v-else
            class="block px-4 py-2 text-green-400 text-sm transition duration-300 hover:bg-green-400 hover:text-white"
            >Login</router-link
          >
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
@media screen and (max-width: 320px) {
  input {
    width: 7rem;
  }
}

@media screen and (min-width: 321px) and (max-width: 360px) {
  input {
    width: 9rem;
  }
}

@media screen and (min-width: 361px) and (max-width: 450px) {
  input {
    width: 10rem;
  }
}

@media screen and (min-width: 451px) and (max-width: 780px) {
  input {
    width: 16rem;
  }
}

@media screen and (min-width: 781px) {
  input {
    width: 30rem;
  }
}
</style>

<script>
import { defineComponent, ref } from "vue";
import { useSidebar } from "../hooks/useSidebar";
import { mapState, mapActions, mapMutations } from "vuex";
import MessageCard from "../components/MessageCardFixed.vue";
//import Cart from '../services/Cart';

export default defineComponent({
  setup(_, { emit }) {
    const dropdownOpen = ref(false);
    const { isOpen } = useSidebar();

    return {
      isOpen,
      dropdownOpen
    };
  },
  data() {
    return {
      logged: false,
      userType: '',
      name: "Usuário",
      search: "",
      cartQuantity: 0,

      type: "none",
      title: "",
      message: "",
    };
  },
  computed: {
    ...mapState(["login", "user"]),
    firstName() {
      if (this.name == "Usuário") return "Tem uma conta? Faça login!";
      else return `Olá, ${this.name[0].toUpperCase() + this.name.substr(1)}!`;
    },
  },
  async created() {
    if (this.user.user.name) this.name = this.user.user.name;
    if (this.login.login.isLogged) this.logged = this.login.login.isLogged;

    if(this.login.login.isLogged && this.user.user.type != 'V'){
      await this.loadCart(1)
      const cartItems = await this.getItems();
      const quantity = await this.getCartQuantity()
      this.cardQuantity = quantity.items;
    }

    this.userType = this.$store.state.user.user.type || undefined;

  },
  methods: {
    ...mapMutations(['setSearch']),
    ...mapActions(["logout", "getItems", 'loadCart', 'getCartQuantity']),
    log: async function () {
      const result = await this.$store.dispatch("logout");
    },
    keyMonitor(event) {
      event.key == "Enter" ? this.searching() : undefined;
    },
    searching() {
      if (!this.search || this.search.length < 3) {
        this.message = "Mínimo de 3 letras para pesquisar!";
        this.title = "Atenção!";
        this.type = "info";
      } else {
        this.setSearch(this.search);
        this.$router.push({ path: "/busca", query: { search: this.search, page: 1 }});
      }
      setTimeout(() => {
        this.type = "none";
      }, 3000);
    },
  },
  watch: {
    async '$store.state.cart.cart'(value) {
      if(this.$store.state.login.login.isLogged && this.$store.state.user.user.type != 'V' ){
        const quantity = await this.getCartQuantity();
        this.cartQuantity = parseInt(quantity.items) || 0;
      }else if(!this.$store.state.login.login.isLogged){
        console.log('tmao aqui')
        let quantity = await this.getCartQuantity();
        this.cartQuantity = parseInt(quantity.items) || 0;
      }
      this.$forceUpdate();
    }
  },
  components: {
    MessageCard,
  },
});
</script>
