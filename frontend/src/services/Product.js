import { axios, apiURL } from './config.js';

class Product {
    static async getAll(page = 1) {
        try {
            const response = await axios.get(`${apiURL}/product/all?page=${page}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async getProductById(id) {
        try {
            const response = await axios.get(`${apiURL}/product/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getSalesmanProduct(id, page = 1) {
        try {
            const response = await axios.get(`${apiURL}/product/salesman/${id}?page=${page}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async search(search) {
        try {
            console.log(search, 'prods')
            const response = await axios.get(`${apiURL}/product/search?search=${search}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async create(data) {
        try {
            const response = await axios.post(`${apiURL}/product`, data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    static async update(data) {
        try {
            const response = await axios.put(`${apiURL}/product`, data);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async destroy(id) {
        try {
            const response = await axios.delete(`${apiURL}/product/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getImage(url){
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'blob',
                    'Response-Type': 'blob'
                }
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Product;