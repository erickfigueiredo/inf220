<template>
  <div class="min-h-screen flex flex-col">
    <div
      :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div
        class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
      >
        <div
          class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
        >
          <svg
            class="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">Material não encontrado</p>
            <div class="modal-close cursor-pointer z-50" @click="open = false">
              <svg
                class="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>

          <!--Body-->
          <p>
            Esse material ainda não está cadastrado, deseja cadastrar agora?
          </p>

          <!--Footer-->
          <div class="flex justify-end pt-2">
            <button
              @click="open = false"
              class="px-6 py-3 bg-transparent p-3 rounded-lg text-red-600 hover:bg-gray-100 hover:text-red-800 mr-2"
            >
              Fechar
            </button>
            <button
              @click="updateMaterialAndProduct()"
              class="px-6 py-3 bg-red-600 hover:bg-red-800 text-white font-bold border-b-4 border-red-800 focus:outline-none rounded"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <MessageCardFixed :message="message" :title="title" :type="type" />
    <div class="flex-grow px-6 pt-8 pb-2">
      <h2 class="text-2xl lg:text-5xl text-gray-800 lg:font-light mb-2">
        Edição de Produto
      </h2>
      <div class="bg-white mt-4 rounded-lg p-6 mb-12">
        <form>
          <div class="w-full mb-5">
            <div class="mb-4">
              <input
                accept="image/x-png,image/jpeg"
                class="inputfile"
                id="image"
                name="image"
                type="file"
                multiple
                @change="addPhoto"
                required
              />
            </div>
            <div id="preview" class="flex overflow-x-auto space-x-2 rounded-lg">
              <label
                for="image"
                class="cursor-pointer mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
              >
                Fotos: {{ qtdImages }}
                <br />
                <div
                  class="mt-4 rounded-lg w-24 h-24 border border-solid border-red-600 font-normal text-red-600"
                >
                  <p class="text-center mt-5 mb-1 w-full">Selecione</p>
                  <p class="text-center">
                    <i
                      class="far fa-images text-red-600 text-center text-2xl text-light"
                    ></i>
                  </p>
                </div>
              </label>
              <div v-for="image in images" :key="image.key">
                <img
                  class="rounded object-cover h-24 w-24 mt-preview"
                  width="80px"
                  height="80px"
                  :src="image.url"
                  :title="image.key"
                />
                <div @click="removeImage(image.key)" class="text-center">
                  <i
                    class="far fa-trash-alt hover:text-red-600 cursor-pointer"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <div class="md:flex md:space-x-6">
            <div class="w-full md:w-1/2">
              <div class="mb-4">
                <label
                  for="title"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Título
                </label>
                <input
                  id="title"
                  v-model="titleProduct"
                  name="title"
                  type="text"
                  placeholder="Nome do produto"
                  required
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 px-4"
                />
              </div>
              <div class="sm:flex mb-4 sm:space-x-4">
                <div class="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    for="material"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Material
                  </label>
                  <input
                    v-model="material"
                    class="p-5 w-full border rounded h-10"
                    list="list-material"
                    required
                  />
                  <datalist v-if="!loading" id="list-material">
                    <option
                      v-for="material in materialList"
                      :key="material.id"
                      :value="material.name"
                    />
                  </datalist>
                </div>
                <div class="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label
                    for="style"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Estilo de trabalho
                  </label>
                  <select
                    id="style"
                    v-model="style"
                    name="style"
                    required
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 px-4"
                  >
                    <option value="polido">Polido</option>
                    <option value="escovado">Escovado</option>
                    <option value="laminado">Laminado</option>
                    <option value="polido e resinado">Polido e resinado</option>
                  </select>
                </div>
              </div>
              <div class="sm:flex mb-4 sm:space-x-4">
                <div class="w-full sm:w-2/8 mb-4 sm:mb-0">
                  <label
                    for="price"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Preço
                  </label>
                  <div class="relative">
                    <div
                      class="absolute flex border border-transparent left-0 top-0 h-full w-10"
                    >
                      <div
                        class="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-md h-full w-full"
                      >
                        R$
                      </div>
                    </div>
                    <input
                      id="price"
                      v-model="price"
                      name="price"
                      type="number"
                      step="0.01"
                      placeholder="Valor por unidade"
                      required
                      class="text-sm sm:text-sm relative w-full border rounded text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 pr-2 pl-12"
                    />
                  </div>
                </div>
                <div class="w-full sm:w-2/8 mb-4 sm:mb-0">
                  <label
                    for="discount"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Desconto
                  </label>
                  <div class="relative">
                    <div
                      class="absolute flex border border-transparent right-0 top-0 h-full w-10"
                    >
                      <div
                        class="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-md h-full w-full"
                      >
                        %
                      </div>
                    </div>
                    <input
                      id="discount"
                      v-model="discount"
                      name="discount"
                      type="number"
                      step="1"
                      min="0"
                      max="99"
                      placeholder="Porcentagem"
                      required
                      class="text-sm sm:text-sm relative w-full border rounded text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 pr-2 pl-2"
                    />
                  </div>
                </div>
                <div class="w-full sm:w-1/6 mb-4 sm:mb-0">
                  <label
                    for="quantity"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Unidades
                  </label>
                  <input
                    id="quantity"
                    v-model="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Qtd"
                    required
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 px-4"
                  />
                </div>
                <div class="w-full sm:w-2/8">
                  <label
                    for="quanlity"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Qualidade
                  </label>
                  <select
                    id="quality"
                    v-model="quality"
                    name="quality"
                    required
                    class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 px-4"
                  >
                    <option value="1">Tipo A</option>
                    <option value="2">Tipo B</option>
                    <option value="3">Tipo C</option>
                  </select>
                </div>
              </div>
              <div class="sm:flex mb-6 sm:space-x-4">
                <div class="w-full sm:w-1/3 mb-4 sm:mb-0">
                  <label
                    for="height"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Altura
                  </label>
                  <div class="relative">
                    <div
                      class="absolute flex border border-transparent right-0 top-0 h-full w-10"
                    >
                      <div
                        class="flex items-center justify-center rounded-tr rounded-br z-10 bg-gray-100 text-gray-600 text-md h-full w-full"
                      >
                        cm
                      </div>
                    </div>
                    <input
                      id="height"
                      v-model="height"
                      name="height"
                      type="number"
                      step="1"
                      placeholder="Medida"
                      required
                      class="text-sm sm:text-sm relative w-full border rounded text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 pl-2 pr-12"
                    />
                  </div>
                </div>
                <div class="w-full sm:w-1/3 mb-4 sm:mb-0">
                  <label
                    for="width"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Largura
                  </label>
                  <div class="relative">
                    <div
                      class="absolute flex border border-transparent right-0 top-0 h-full w-10"
                    >
                      <div
                        class="flex items-center justify-center rounded-tr rounded-br z-10 bg-gray-100 text-gray-600 text-md h-full w-full"
                      >
                        cm
                      </div>
                    </div>
                    <input
                      id="width"
                      v-model="width"
                      name="width"
                      type="number"
                      step="1"
                      placeholder="Medida"
                      required
                      class="text-sm sm:text-sm relative w-full border rounded text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 pl-2 pr-12"
                    />
                  </div>
                </div>
                <div class="w-full sm:w-1/3">
                  <label
                    for="depth"
                    class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                  >
                    Espessura
                  </label>
                  <div class="relative">
                    <div
                      class="absolute flex border border-transparent right-0 top-0 h-full w-10"
                    >
                      <div
                        class="flex items-center justify-center rounded-tr rounded-br z-10 bg-gray-100 text-gray-600 text-md h-full w-full"
                      >
                        cm
                      </div>
                    </div>
                    <input
                      id="depth"
                      v-model="depth"
                      name="depth"
                      type="number"
                      step="1"
                      placeholder="Medida"
                      required
                      class="text-sm sm:text-sm relative w-full border rounded text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 pl-2 pr-12"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 mt-4 md:mt-0">
              <div class="mb-4">
                <label
                  for="desc"
                  class="mb-1 text-xs font-bold sm:text-sm tracking-wide text-gray-600"
                >
                  Descrição
                </label>
                <textarea
                  id="desc"
                  v-model="description"
                  name="desc"
                  placeholder="Aqui você pode informar dados sobre o produto que não foram contemplados ao lado..."
                  rows="13"
                  required
                  class="text-sm sm:text-sm w-full border rounded text-gray-800 placeholder-gray-500 focus:border-red-600 focus:outline-none py-2 px-4"
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              @click="updateProduct"
              class="transition duration-150 py-2 px-4 bg-red-600 hover:bg-red-800 text-white font-bold border-b-4 border-red-800 focus:outline-none rounded w-full mt-6"
            >
              Editar produto
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import MessageCardFixed from "../components/MessageCardFixed.vue";
import Footer from "../components/Footer.vue";
import Product from "../services/Product";
import Material from "../services/Material";
import Discount from "../services/Discount";

export default {
  data() {
    return {
      type: "none",
      title: "",
      message: "",
      qtdImages: 0,

      titleProduct: "",
      images: [],
      price: undefined,
      discount: undefined,
      pastDiscount: undefined,
      quantity: undefined,
      quality: "A",
      width: undefined,
      height: undefined,
      depth: undefined,
      description: undefined,

      materialList: [],
      material: undefined,
      style: undefined,
      loading: true,

      deleteImage: [],
      defaultImages: [],
      files: [],

      open: false,
      createMaterial: undefined,
    };
  },
  methods: {
    async removeImage(key) {
      for (let img of this.defaultImages) {
        if (key == img.key) {
          this.images = this.images.filter((image) => image.key != key);
          this.deleteImage.push(key);
          this.qtdImages--;
          return;
        }
      }
      this.images = this.images.filter((image) => image.key != key);
      this.files = this.files.filter((file) => file.name != key);
      this.qtdImages--;
    },
    setMessage(title, type, message, miliseconds) {
      this.message = message;
      this.type = type;
      this.title = title;
      setTimeout(() => {
        this.type = "none";
      }, miliseconds);
    },
    addPhoto(e) {
      const files = e.target.files;
      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          if (!/\.(jpe?g|png)$/i.test(files[i].name))
            return this.setMessage(
              "Imagem não carregada",
              "error",
              `${files[i].name} não tem o formato permitido!`,
              4000
            );
          if (this.qtdImages + 1 <= 15) {
            this.images.push({
              key: files[i].name,
              url: (window.URL ? URL : webkitURL).createObjectURL(files[i]),
            });
            this.files.push(files[i]);
            this.qtdImages++;
          }
        }
      }
    },
    async updateProduct() {
      console.log("ok");
      const exists = this.materialList.filter((material) => {
        if (
          material.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") ==
          this.material
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
          return material;
      });

      let data = {
        title: this.titleProduct,
        price: parseFloat(this.price).toFixed(2),
        quantity: parseInt(this.quantity),
        quality: this.quality,
        width: parseFloat(this.width).toFixed(2),
        height: parseFloat(this.height).toFixed(2),
        depth: parseFloat(this.depth).toFixed(2),
        description: this.description,
        style: this.style,
        id_product: this.id_product,
      };

      this.deleteImage.length
        ? (data["delete_image"] = this.deleteImage)
        : undefined;
      this.discount != this.pastDiscount && !(this.discount == 0 && !this.pastDiscount)
          ? (data["discount"] = this.discount || 0)
          : undefined;

      if (exists && exists.length) {
        data.id_material = exists[0].id;
      } else {
        this.open = true;
        return;
      }

      let formData = new FormData();
      for (let image of this.files) formData.append("file", image);

      formData.append("data", JSON.stringify(data));
      const result = await Product.update(formData);
      if (result.success) {
        this.setMessage("Sucesso!", "success", "Produto atualizado!", 3000);
        //this.$router.push({ path: "/produto/" + result.product.id });
      } else this.setMessage("Erro!", "error", result.message, 3000);
    },
    async updateMaterialAndProduct() {
      let data = {
        title: this.titleProduct,
        price: parseFloat(this.price).toFixed(2),
        quantity: parseInt(this.quantity),
        quality: this.quality,
        width: parseFloat(this.width).toFixed(2),
        height: parseFloat(this.height).toFixed(2),
        depth: parseFloat(this.depth).toFixed(2),
        description: this.description,
        style: this.style,
        id_product: this.id_product,
      };

      const material = await Material.create({
        name: this.material,
        id_salesman: this.$store.state.user.user.id_salesman,
      });
      if (material.success) {
        data.id_material = material.material.id;

        this.deleteImage.length
          ? (data["delete_image"] = this.deleteImage)
          : undefined;
        this.discount != this.pastDiscount && !(this.discount == 0 && !this.pastDiscount)
          ? (data["discount"] = this.discount || 0)
          : undefined;

        let formData = new FormData();
        for (let image of this.files) {
          formData.append("file", image);
        }
        formData.append("data", JSON.stringify(data));
        const result = await Product.update(formData);
        if (result.success) {
          this.setMessage("Sucesso!", "success", "Produto cadastrado!", 3000);
        } else this.setMessage("Erro!", "error", result.message, 3000);
      } else {
        this.setMessage("Erro!", "error", material.message, 3000);
      }
      this.open = false;
    },
  },
  components: {
    MessageCardFixed,
    Footer,
  },
  async created() {
    if (!this.$store.state.user.user.id_salesman) this.$router.push("/");
    const id_product = parseInt(this.$route.params.id);
    if (!id_product || isNaN(id_product))
      return this.$router.push({ patch: "/" });
    this.id_product = id_product;

    const product = await Product.getProductById(id_product);
    console.log(product);
    if (product.success) {
      this.titleProduct = product.product.title;
      this.price = product.product.price;
      this.quantity = product.product.quantity;
      this.quality = product.product.quality;
      this.width = product.product.width;
      this.height = product.product.height;
      this.depth = product.product.depth;
      this.description = product.product.description;
      this.id_salesman = product.product.id_salesman;
      this.style = product.product.style || "polido";
      this.material = product.product.material;
      this.discount = parseInt(product.product.discount) || 0;
      this.pastDiscount = product.product.discount;
      this.images = product.product.images;
      this.qtdImages = product.product.images.length;

      this.defaultImages = product.product.images.filter(() => true);
      console.log(this.defaultImages);
    } else return this.$router.push({ patch: "/" });

    const materials = await Material.getAll(1);
    this.materialList = materials.material;
    this.loading = false;
  },
  watch: {
    discount(newDiscount, old) {
      if (newDiscount < 0 || newDiscount > 99) this.discount = old || 0;
    },
  },
};
</script>

<style>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.mt-preview {
  margin-top: 2.25rem;
  min-width: 100px;
}

.modal {
  transition: opacity 0.25s ease;
}

img {
  top: -50px !important;
}
</style>
