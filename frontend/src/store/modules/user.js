const getters = {

}

const actions = {

}

const mutations = {
    setUser: (state, payload) =>  state.user = payload,
    resetUser: (state) => {
        window.localStorage.removeItem('user')
        window.localStorage.setItem('user', JSON.stringify(user));
        state.user = {...user};
    }
}

let user = {
    name: null,
    id_user: null,
    type: null,
    email: null,
    id_salesman: null,
    id_client: null
}

export default {
    getters,
    actions,
    mutations,
    state: {
        user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : user
    }
}