import { axios, apiURL } from './config.js';

class Product {
    static async getAll() {
        try {
            const response = await axios.get(`${apiURL}/product/all/all`);
            console.log(response)
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getProductsInPromo(){
        try {
            const response = await axios.get(`${apiURL}/product/discount`);
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

    static async search(search) {
        try {
            console.log(search, 'prods')
            const response = await axios.get(`${apiURL}/product/search?search=${search}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Product;