import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { BASEURL } from './path';

// Define your API response types
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
}


// Create a configured Axios instance with TypeScript
const apiClient: AxiosInstance = axios.create({
    baseURL: BASEURL,
    // timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor with TypeScript
apiClient.interceptors.request.use((config) => {
    console.log('Sending request to:', config.url);
    return config;
},
    (error: AxiosError) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor with TypeScript
apiClient.interceptors.response.use(
    (response) => {
        return response.data; // Return only the data part
    },
    (error: AxiosError<ApiResponse>) => {
        const errorMessage = error.response?.data?.message ||
            error.message ||
            'Request failed';
        console.error('API Error:', errorMessage);
        return Promise.reject(new Error(errorMessage));
    }
);

export default apiClient;