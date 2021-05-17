import Cart from '../../services/Cart'
import Product from '../../services/Product'
let cart

const getters = {}

const actions = {
    getItems: async({ state, rootState }, page = 1) => {
        return new Promise((resolve, reject) => {
            if (rootState.login.login.isLogged) resolve(state.cart)
            else {
                state.pagination.currentPage = page
                if (!state.pagination)
                    state.pagination = {
                        perPage: 5,
                        currentPage: 1,
                        lastPage: Math.cail(state.cart.length / 5) || 1
                    }
                resolve(
                    state.cart.slice(
                        state.pagination.perPage * (state.pagination.currentPage - 1),
                        state.pagination.perPage * state.pagination.currentPage
                    )
                )
            }
        })
    },
    getCartPagination: async({ state }) => {
        return new Promise((resolve, reject) => {
            resolve(state.pagination)
        })
    },
    getCartQuantity: async({ state, rootState }) => {
        return new Promise(async resolve => {
            if (rootState.login.login.isLogged) {
                const quantity = await Cart.getCartQuantity(rootState.user.user.id_user)
                resolve(quantity)
            } else {
                let quantity = 0
                for (let item of state.cart) quantity += parseInt(item.cart_quantity)
                resolve({ success: true, items: quantity || 0 })
            }
        })
    },
    setItem: async({ state, rootState, dispatch }, payload) => {
        return new Promise(async(resolve, reject) => {
            if (rootState.login.login.isLogged) {
                const result = await Cart.create({
                    id_user: rootState.user.user.id_user,
                    id_product: payload.id_product,
                    quantity: payload.cart_quantity
                })
                return result.success ?
                    dispatch('loadCart') &&
                    resolve({ success: true, message: 'Item adicionado!' }) :
                    resolve({
                        success: false,
                        message: 'Falha ao colocar item no carrinho!'
                    })
            } else {
                let items = state.cart
                const id_product = payload.id_product
                const cart_quantity = parseInt(payload.cart_quantity)

                let exists = false
                for (let prod of items) {
                    if (prod.id_product == id_product) {
                        prod.cart_quantity = parseInt(prod.cart_quantity)
                        exists = true
                        if (prod.cart_quantity + cart_quantity > prod.quantity)
                            return resolve({
                                success: false,
                                message: 'Quantidade maior que a disponível!'
                            })
                        else prod.cart_quantity += cart_quantity
                    }
                }

                if (!exists) {
                    const product = await Product.getProductById(id_product)
                    payload = {...payload, ...product.product }
                }
                if (items && !exists) items.push(payload)
                else if (!items) items = [payload]

                state.cart = items
                state.pagination = {
                    currentPage: 1,
                    lastPage: Math.ceil(items.length / 5),
                    perPage: 5
                }
                console.log(state.pagination)
                window.localStorage.setItem('cart', JSON.stringify(items))
                resolve({ success: true, message: 'Item adicionado!' })
            }
        })
    },
    syncronizeLocalAndServer: async({ commit, state, rootState }, id_user) => {
        const items = JSON.parse(window.localStorage.getItem('cart'))
        if (rootState.user.user.type == 'V' || rootState.user.user.type == 'A')
            return false
        for (let item of items) {
            await Cart.create({
                id_product: item.id_product,
                id_user,
                quantity: item.cart_quantity
            })
        }
        const result = await Cart.getAll(rootState.user.user.id_user)
        result.cart ? (state.cart = result.cart) : (state.cart = [])
        window.localStorage.setItem('cart', [])
        return true
    },
    removeItem: async({ state, rootState, dispatch }, payload) => {
        //Payload -> id dos itens a remover do carrinho
        return new Promise(async resolve => {
            if (rootState.login.login.isLogged) {
                await Cart.destroy(payload.id_item)
                await dispatch('loadCart', state.pagination.currentPage)
            } else {
                let items = state.cart
                items = items.filter(item => {
                    return item.id_product != payload.id_product
                })

                if (state.pagination.currentPage > Math.ceil(items.length / 5))
                    state.pagination.currentPage -= 1
                if (state.pagination.lastPage > Math.ceil(items.length / 5))
                    state.pagination.lastPage -= 1
                state.cart = items.slice(
                    state.pagination.perPage * (state.pagination.currentPage - 1),
                    state.pagination.perPage * state.pagination.currentPage
                )
                window.localStorage.setItem('cart', JSON.stringify(items))
            }
            resolve({ success: true, message: 'Removido!' })
        })
    },
    loadCart: async({ state, dispatch, rootState }, page = 1) => {
        if (rootState.login.login.isLogged && rootState.user.user.type != 'V') {
            let result = await Cart.getAll(rootState.user.user.id_user, page)
            if (!result.success || !result.cart.data.length)
                result = await Cart.getAll(rootState.user.user.id_user, page - 1)
            if (result.success) {
                state.cart = result.cart.data
                state.pagination = result.cart.pagination
            } else if (window.localStorage.getItem('cart'))
                dispatch('syncronizeLocalAndServer', rootState.user.user.id_user)
            else state.cart = []
        } else {
            window.localStorage.getItem('cart') ?
                (state.cart = JSON.parse(window.localStorage.getItem('cart'))) :
                (state.cart = [])
            state.pagination.currentPage = page
            state.pagination.lastPage = Math.ceil(state.cart.length / 5) || 1
        }
    },
    updateQuantity: async({ state, rootState, dispatch }, payload) => {
        return new Promise(async resolve => {
            if (rootState.login.login.isLogged) {
                await Cart.update({
                    id_item: payload.id_item,
                    quantity: payload.cart_quantity
                })
                await dispatch('loadCart')
            } else {
                let id_product = payload.id_product
                const newQuantity = payload.cart_quantity

                let items = state.cart
                let quantityInvalid = false
                items = items.filter(item => {
                    if (item.id_product == id_product && newQuantity <= item.quantity) {
                        item.cart_quantity = newQuantity
                    } else if (item.id_product == id_product) {
                        quantityInvalid = true
                        resolve({ success: false, message: 'Quantidade Inválida!' })
                    }
                    return true
                })
                state.cart = items
                window.localStorage.setItem('cart', JSON.stringify(items))
                if (quantityInvalid) return
            }
            resolve({ success: true, message: 'Quantidade atualizada!' })
        })
    }
}

const mutations = {
    resetCart: ({ state }) => {
        window.localStorage.setItem('cart', [])
    }
}

export default {
    getters,
    actions,
    mutations,
    state: {
        cart,
        pagination: { perPage: 5, currentPage: 1, lastPage: 1 }
    }
}