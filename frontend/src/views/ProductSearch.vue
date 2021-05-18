<template>
  <div class="min-h-screen flex flex-col">
    <div id="top" class="flex-grow px-6 pt-8 pb-2">
      <Label :title="searchQuery" />
      <ProductGrid v-if="!empty && !loading" :data="products" />
      <div v-if="empty" class="my-16 text-center text-gray-500">
        <span class="text-3xl md:text-4xl lg:text-6xl"
          ><i class="fas fa-search"></i
        ></span>
        <p>Ops! Não temos nenhum produto com o nome informado...</p>
      </div>
      <ProductGridLoad v-if="loading" :isGrid="true" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Label from "../components/Label.vue";
import ProductGrid from "../components/ProductGrid.vue";
import ProductGridLoad from "../components/ProductGridLoad.vue";
import Pagination from "../components/Pagination.vue";
import Footer from "../components/Footer.vue";

import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      products: [],
      pagination: {},
      searchQuery: "",
      empty: false,
      loading: true,

      isBack: false,
      pageBack: undefined,
      backHistory: (event) => {
        if (event.state && !this.isBack) {
          this.isBack = true;
          console.log(event);
          this.pageBack = parseInt(event.state.current.split("=")[2]);
        }
        event.preventDefault();
        event.stopPropagation();
      },
    };
  },
  components: {
    Label,
    ProductGridLoad,
    ProductGrid,
    Pagination,
    Footer,
  },
  async created() {
    if (this.$route.query.search) this.searchQuery = this.$route.query.search;
    else this.$router.push({ path: "/" });
    let page = 1;
    if (this.$route.query.page) page = this.$route.query.page;

    this.setSearch(this.searchQuery);
    this.search({ page: page });

    window.addEventListener("popstate", this.backHistory);
  },
  watch: {
    $route(to, from) {
      if (!to.query.search) return;
      if (from.query.search !== to.query.search) {
        this.searchQuery = to.query.search;
        this.setSearch(this.searchQuery);
        return this.reloadSearch(1);
      }
    },
    "$store.state.search.products"(newProducts, oldProducts) {
      if (newProducts != oldProducts) {
        this.products = newProducts ? newProducts : [];
      }
      if (newProducts.length) this.empty = false;
      else this.empty = true;
    },
    "$store.state.search.loading"(newLoading) {
      if (newLoading) {
        this.loading = true;
        this.empty = false;
      } else {
        this.loading = false;
        //if (this.products == undefined || []) this.empty = true;
      }
    },
    async "$route.query.page"(newPage) {
      console.log(newPage);
      setTimeout(async () => {
        if (this.isBack) {
          await this.search({ page: this.pageBack, pagination: true });
          let search = await this.getSearch();
          await this.$router.replace({
            path: "/busca",
            query: { search, page: !this.pageBack ? 1 : this.pageBack },
          });
          this.isBack = false;
        }
      }, 200);
      // if(newPage < oldPage) {
      //   await this.search({page: newPage});
      //   await this.backToTop();
      //   let search = await this.getSearch();
      //   await this.$router.replace({path: '/busca', query: {search, page: newPage}, hash: ''})
      // }
    },
    "$store.state.search.pagination"(newPagination) {
      console.log(newPagination, "ok");
      if (newPagination) this.pagination = newPagination;
    },
  },
  methods: {
    ...mapMutations(["setSearch"]),
    ...mapActions(["search", "getSearch"]),
    async reloadSearch(page) {
      this.loading = true;
      this.empty = false;
      setTimeout(async () => {
        await this.search({ page });
      }, 1000);
    },
    async goToPage(event, page) {
      await this.search({ page, pagination: true });
      await this.backToTop();
      let search = await this.getSearch();
      await this.$router.replace({
        path: "/busca",
        query: { search, page },
        hash: "",
      });
    },
    async backToTop() {
      await this.$smoothScroll({
        scrollTo: document.getElementById("top"),
        duration: 0,
      });
    },
  },
  unmounted() {
    window.removeEventListener("popstate", this.backHistory);
  },
};
</script>
