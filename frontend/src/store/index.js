import { createStore } from 'vuex';
import login from './modules/login';
import user from './modules/user';
import search from './modules/search';
import cart from './modules/cart';
import history from './modules/history';

const getters = {

}

const actions = {

}

const mutations = {

}

const modules = {
    login,
    user,
    search,
    cart,
    history
}

export default createStore({
    modules,
    getters,
    actions,
    mutations,
    state: {

    }
})