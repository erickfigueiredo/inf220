import { axios, apiURL } from './config.js';

class Market {
    static async getAll() {
        try {
            const response = await axios.get(`${apiURL}/market/all`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getMarketById(id) {
        try {
            const response = await axios.get(`${apiURL}/market/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Market;