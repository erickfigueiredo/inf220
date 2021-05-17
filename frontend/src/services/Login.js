import { axios, apiURL } from './config';

class Login {
    static async login(email, password) {
        try {
            const response = await axios.post(`${apiURL}/login`, { email, password });
            return response.data;
        } catch (error) {
            return {...error.response.data, status: error.response.status}
        }
    }
}

export default Login