import { createStore } from 'vuex';
import login from './modules/login';
import user from './modules/user';
import search from './modules/search';
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