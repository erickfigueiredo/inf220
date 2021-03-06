import { axios, apiURL } from './config.js';

class Discount {
    static async getAll() {
        try {
            const response = await axios.get(`${apiURL}/discount/all`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getDiscountById(id) {
        try {
            const response = await axios.get(`${apiURL}/discount/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/discount`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Discount