function Fita() {
    this.fita = [];
    this.ptr = 0;
    this.insert = param => {
        this.fita[this.fita.length] = param;
        this.ptr = this.fita.length;
    }
    this.prev = () => {
        if (this.ptr > 0) this.ptr--;
        return this.fita[this.ptr];
    }
    this.next = () => {
        if (this.ptr < this.fita.length - 1) this.ptr++;
        return this.fita[this.ptr];
    }
    this.on = () => this.fita[this.ptr];
}

const actions = {}

const getters = {
    top: state => state.fita.on()
}

const mutations = {
    insert: (state, payload) => {
        state.fita.insert(payload);
    },
    prev: state => {
        state.fita.prev();
    },
    next: state => {
        state.fita.next();
    }
}

export default {
    getters,
    actions,
    mutations,
    state: {
        fita: Fita
    }
}