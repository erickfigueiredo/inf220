import { axios, apiURL } from './config.js';

class Address {
    static async getAll(id_user) {
        try {
            const response = await axios.get(`${apiURL}/address/all/${id_user}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getAddressById(id) {
        try {
            const response = await axios.get(`${apiURL}/address/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/address`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(data) {
        try {
            const response = await axios.put(`${apiURL}/address/`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Address;