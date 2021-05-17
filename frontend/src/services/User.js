import { axios, apiURL } from './config.js';

class User {
    static async getAll(page = 1) {
        try {
            const response = await axios.get(`${apiURL}/user/all?page=${page}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getUserById(id) {
        try {
            const response = await axios.get(`${apiURL}/user/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/user`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(data) {
        try {
            const response = await axios.put(`${apiURL}/user`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async destroy(id){
        try {
            const response = await axios.delete(`${apiURL}/user/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default User;