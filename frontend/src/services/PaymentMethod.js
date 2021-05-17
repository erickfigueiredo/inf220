import { axios, apiURL } from './config.js';

class Bank {
    static async getAll(id_client) {
        try {
            const response = await axios.get(`${apiURL}/paymentmethod/all/${id_client}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getPayment(id) {
        try {
            const response = await axios.get(`${apiURL}/paymentmethod/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/bank`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Bank;