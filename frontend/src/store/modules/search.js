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
            if (!payload.pagination) {
                commit('resetSearch');
                Object.keys(payload).map(function (key, index) {
                    payload[key] && key != 'search' ? query = `${query}&${key}=${payload[key]}` : undefined;
                    state[key] = payload[key];
                });
            } else {
                let aux = {
                    min_price: state.min_price,
                    max_price: state.max_price,
                    min_quality: state.min_quality,
                    max_quality: state.max_quality,
                    max_distance: state.max_distance,
                    min_distance: state.min_distance,
                    page: payload.page || 1
                }
                Object.keys(aux).map(function (key, index) {
                    aux[key] != undefined && key != 'search' ? query = `${query}&${key}=${aux[key]}` : undefined;
                });
            }
            console.log(query)
            console.log(payload, 'playload')

            Product.search(query).then(result => {
                console.log(result)
                if (result.success) {
                    commit("setFilters", payload);
                    commit('setProducts', result.product.data);
                    commit('setPagination', result.product.pagination);
                    resolve(result);
                } else {
                    commit("setFilters", payload);
                    commit('setProducts', []);
                    commit('setPagination', { lastPage: 1, currentPage: '1' });
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
        Object.keys(payload).map(function (key, index) {
            payload[key] ? state.key = payload[key] : undefined;
        });
    },
    resetSearch: (state) => {
        state.search = '';
        state.min_price = undefined;
        state.max_price = undefined;
        state.min_quality = undefined;
        state.max_quality = undefined;
        state.max_distance = undefined;
        state.min_distance = undefined;
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
        min_quality: undefined,
        max_quality: undefined,
        max_distance: undefined,
        min_distance: undefined,
        products: undefined,
        loading: false,
        pagination: undefined
    }
}