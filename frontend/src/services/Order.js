import { axios, apiURL } from './config.js';

class Order {
    static async getAll() {
        try {
            const response = await axios.get(`${apiURL}/order/all`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getOrderById(id) {
        try {
            const response = await axios.get(`${apiURL}/order/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/order`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Order