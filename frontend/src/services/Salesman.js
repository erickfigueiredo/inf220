import { axios, apiURL } from './config.js';

class Salesman {
    static async getAll(page = 1) {
        try {
            const response = await axios.get(`${apiURL}/salesman/all?page=${page}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getSalesmanById(id) {
        try {
            const response = await axios.get(`${apiURL}/salesman/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/salesman`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(data) {
        try {
            const response = await axios.put(`${apiURL}/salesman`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async destroy(id){
        try {
            const response = await axios.delete(`${apiURL}/salesman/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Salesman;