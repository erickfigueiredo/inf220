import { axios, apiURL } from './config.js';

class Client {
    static async getAll(page = 1) {
        try {
            const response = await axios.get(`${apiURL}/client/all?page=${page}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getClientById(id) {
        try {
            const response = await axios.get(`${apiURL}/client/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/client`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(data) {
        try {
            const response = await axios.put(`${apiURL}/client`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async destroy(id){
        try {
            const response = await axios.delete(`${apiURL}/client/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Client