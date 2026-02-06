import axios from 'axios';

const api = axios.create({
    baseURL: "https://authentication-seven-henna.vercel.app/api"
})

export default api;
