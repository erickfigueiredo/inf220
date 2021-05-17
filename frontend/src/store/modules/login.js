import Login from '../../services/Login';

const getters = {

}

const actions = {
    login: async({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            Login.login(payload.email, payload.password).then(result => {
                if (result.success) {
                    commit("setLogin", { isLogged: true, token: result.token });
                    commit("setUser", result.data);
                    window.localStorage.setItem('token', result.token);
                    window.localStorage.setItem('user', JSON.stringify(result.data));
                    resolve(result);
                } else resolve(result);
            }).catch(error => {
                reject(error);
            })
        })
    },
    logout: async({ commit }, payload) => {
        commit("resetLogin");
        commit("resetUser");
        commit("resetCart");
    }
}

let login = {
    isLogged: false,
    token: window.localStorage.getItem('token')
}

const mutations = {
    setLogin: (state, payload) => state.login = payload,
    resetLogin: (state) => {
        window.localStorage.setItem('token', undefined);
        state.login.isLogged = false;
    },
}


if (window.localStorage.getItem('token') && window.localStorage.getItem('token') !== 'undefined') login.isLogged = true;
export default {
    getters,
    actions,
    mutations,
    state: {
        login
    }
}