import { createRouter, createWebHistory } from 'vue-router';

import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Retrieve from './views/Retrieve.vue';
import NewPassword from './views/NewPassword.vue'

import Home from './views/Home.vue';
import ShoppingCart from './views/ShoppingCart.vue';
import Profile from './views/Profile.vue';
import HubMessage from './views/HubMessage.vue';

import ProductSearch from './views/ProductSearch.vue';
import ProductGeneral from './views/ProductGeneral.vue';
import ProductRegistration from './views/ProductRegistration.vue';
import ProductAlteration from './views/ProductAlteration.vue';

import SalesmanMarket from './views/SalesmanMarket.vue';
import NotFound from './views/NotFound.vue';

// Não pertencem à aplicação final
import Dashboard from './views/Dashboard.vue';
import Forms from './views/Forms.vue';
import Tables from './views/Tables.vue';
import UIElements from './views/UIElements.vue';
import Modal from './views/Modal.vue';
import Card from './views/Card.vue';
import Blank from './views/Blank.vue';
import ResendConfirmAccount from './views/ResendConfirmAccount.vue';
import ConfirmAccount from './views/ConfirmAccount.vue';

const routes = [{
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { layout: 'empty' },
    },
    {
        path: '/cadastrar',
        name: 'Register',
        component: Register,
        meta: { layout: 'empty' }
    },
    {
        path: '/recuperar-senha',
        name: 'RetrievePassword',
        component: Retrieve,
        meta: { layout: 'empty' }
    },
    {
        path: '/nova-senha',
        name: 'NewPassword',
        component: NewPassword,
        meta: { layout: 'empty' }
    },
    {
        path: '/confirme',
        name: 'Confirm',
        component: ResendConfirmAccount,
        meta: { layout: 'empty' }
    },
    {
        path: '/confirmar-conta',
        name: 'ConfirmAccount',
        component: ConfirmAccount,
        meta: { layout: 'empty' }
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/busca',
        name: 'ProductSearch',
        component: ProductSearch
    },
    {
        path: '/perfil',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/central-mensagens',
        name: 'HubMessage',
        component: HubMessage
    },
    {
        path: '/produto/:id_product',
        name: 'ProductGeneral',
        component: ProductGeneral
    },
    {
        path: '/loja/:id_salesman',
        name: 'SalesmanMarket',
        component: SalesmanMarket
    },
    {
        path: '/produto/cadastrar',
        name: 'ProductRegistration',
        component: ProductRegistration
    },
    {
        path: '/produto/editar/:id',
        name: 'ProductAlteration',
        component: ProductAlteration
    },
    {
        path: '/carrinho',
        name: 'ShoppingCart',
        component: ShoppingCart,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/forms',
        name: 'Forms',
        component: Forms,
    },
    {
        path: '/cards',
        name: 'Cards',
        component: Card,
    },
    {
        path: '/tables',
        name: 'Tables',
        component: Tables,
    },
    {
        path: '/ui-elements',
        name: 'UIElements',
        component: UIElements,
    },
    {
        path: '/modal',
        name: 'Modal',
        component: Modal,
    },
    {
        path: '/blank',
        name: 'Blank',
        component: Blank,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { layout: 'empty' }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition && to.name == 'ProductSearch') return savedPosition;
        else if (savedPosition && to.name == 'ProductSearch' && to.nome == from.name) return { top: 0, left: 0, x: 0, y: 0 }
        else return { x: 0, y: 0 }
    }
});

export default router;