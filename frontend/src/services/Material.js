import { axios, apiURL } from './config.js';

class Material {
    static async getAll() {
        try {
            const response = await axios.get(`${apiURL}/material/all`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getMaterialById(id) {
        try {
            const response = await axios.get(`${apiURL}/material/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/material`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(id, data) {
        try {
            const response = await axios.put(`${apiURL}/material/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async destroy(id) {
        try {
            const response = await axios.delete(`${apiURL}/material/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

}

export default Material