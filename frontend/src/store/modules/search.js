import Product from '../../services/Product';

const getters = {

}

const actions = {
    search: async ({ commit, state }, payload) => {
        state.loading = true;
        return new Promise((resolve, reject) => {
            payload.search = state.search;
            let query = payload.search;
            console.log(state)

            let aux = {
                min_price: state.min_price,
                max_price: state.max_price,
                category: state.category
            }

            console.log(state)
            Object.keys(aux).map(function (key, index) {
                aux[key] != undefined && key != 'search' ? query = `${query}&${key}=${aux[key]}` : undefined;
            });

            console.log(query)
            console.log(payload, 'playload')

            Product.search(query).then(result => {
                console.log(result)
                if (result.success) {
                    commit("setFilters", payload);
                    commit('setProducts', result.product);
                    resolve(result);
                } else {
                    commit("setFilters", payload);
                    commit('setProducts', []);
                    resolve(result);
                }
                state.loading = false;
            }).catch(error => {
                state.loading = false;
                reject(error);
            })
        })
    },
    getSearch: async ({ state }, payload) => {
        return new Promise(resolve => {
            console.log(state)
            resolve(state.search)
        })
    },
}

let login = {
    isLogged: false,
}

const mutations = {
    setSearch: (state, payload) => {
        state.search = payload;
    },
    setProducts: (state, payload) => {
        state.products = payload;
    },
    setFilters: (state, payload) => {
        console.log(payload)
        Object.keys(payload).map(function (key, index) {
            payload[key] ? state[key] = payload[key] : undefined;
        });
    },
    resetSearch: (state) => {
        state.search = '';
        state.min_price = undefined;
        state.max_price = undefined;
        state.category = undefined
    },
    setPagination: (state, payload) => {
        state.pagination = payload;
    }
}

export default {
    getters,
    actions,
    mutations,
    state: {
        search: '',
        min_price: undefined,
        max_price: undefined,
        category: undefined,
        products: undefined,
        loading: false,
    }
}