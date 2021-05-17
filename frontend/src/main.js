import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueSmoothScroll from 'vue3-smooth-scroll'
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
console.log(socket)
import './assets/main.css'

import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'
import VueEasyLightbox from 'vue-easy-lightbox'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const app = createApp(App)
app.config.devtools = true
app.component('default-layout', DashboardLayout)
app.component('empty-layout', EmptyLayout)
app.use(router)
app.use(VueSocketIOExt, socket);
app.use(VueEasyLightbox)
app.use(store)
app.use(VueSmoothScroll)
app.mount('#app')