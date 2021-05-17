import axios from 'axios';
const apiURL = 'http://localhost:3000';
axios.interceptors.request.use((config) => {
    if(config.url.indexOf(apiURL) > -1) config.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
    config.timeout = 5000;
    return config;
})

export {
    apiURL,
    axios
}