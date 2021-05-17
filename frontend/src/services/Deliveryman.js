import { axios, apiURL } from './config.js';

class Deliveryman {
    static async getAll() {
        try {
            const response = await axios.get(`${apiURL}/deliveryman/all`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getDeliverymanById(id){
        try {
            const response = await axios.get(`${apiURL}/deliveryman/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default Deliveryman;