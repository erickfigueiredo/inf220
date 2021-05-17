import { axios, apiURL } from './config.js';

class Category {
    static async getAll() {
        try {
            const response = await axios.get(`${apiURL}/category/all`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getCategoryById(id) {
        try {
            const response = await axios.get(`${apiURL}/category/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/category`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Category