import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000,
    withCredentials: true
});

instance.interceptors.response.use(response => {
    return response.data
})
