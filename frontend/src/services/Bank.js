import { axios, apiURL } from './config.js';

class Bank {
    static async getAll() {
        try {
            const response = await axios.get(`${apiURL}/bank/all`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getBankById(id) {
        try {
            const response = await axios.get(`${apiURL}/bank/${id}`);
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
    static async update(id, data) {
        try {
            const response = await axios.put(`${apiURL}/bank/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async destroy(id){
        try {
            const response = await axios.delete(`${apiURL}/bank/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Bank;