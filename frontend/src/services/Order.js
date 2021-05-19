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
    static async getOrderByIdClient(id) {
        try {
            const response = await axios.get(`${apiURL}/order/all/${id}`);
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
    static async getFrete(id_client, id_market){
        try {
            const response = await axios.get(`${apiURL}/order/frete/${id_client}/${id_market}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Order