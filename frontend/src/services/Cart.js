import { axios, apiURL } from './config.js';

class Cart {
    static async getAll(id_user, page = 1) {
        try {
            const response = await axios.get(`${apiURL}/cart/all/${id_user}?page=${page}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getItemById(id) {
        try {
            const response = await axios.get(`${apiURL}/cart/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/cart`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(data) {
        try {
            const response = await axios.put(`${apiURL}/cart`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async destroy(id) {
        try {
            const response = await axios.delete(`${apiURL}/cart/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getCartQuantity(id_user) {
        try {
            const response = await axios.get(`${apiURL}/cart/quantity/${id_user}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Cart;