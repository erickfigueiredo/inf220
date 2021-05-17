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
    static async recoverPassword(email) {
        try {
            const response = await axios.post(`${apiURL}/recover-password`, { email });
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
    static async confirmRecoverPassword(token, password) {
        try {
            const response = await axios.post(`${apiURL}/change-password?token=${token}`, { password });
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
    static async resendConfirmationEmail(id_user) {
        try {
            const response = await axios.post(`${apiURL}/resend-confirm`, { id_user });
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
    static async confirmEmail(token){
        try {
            const response = await axios.get(`${apiURL}/confirm?token=${token}`);
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
}

export default Login