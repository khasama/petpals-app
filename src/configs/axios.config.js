import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const instance = axios.create({
    baseURL: 'http://192.168.1.17:3321/api/v1/',
    // baseURL: 'http://petpals.supervps.ga/api/v1/',
    withCredentials: true,
});

instance.interceptors.request.use(
    async config => {
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
        config.headers['Content-Type'] = 'multipart/form-data';
        const token = await SecureStore.getItemAsync('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const statusCode = error.response ? error.response.status : null;
        if (statusCode === 401) {
            // notifier.error('Please login to access this resource')
        } else {
            throw error;
        }

    }
);

export default instance;