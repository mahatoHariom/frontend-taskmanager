import axios from 'axios';
import { Store } from '@reduxjs/toolkit';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setupInterceptors = (store: Store) => {
    // Request interceptor
    apiClient.interceptors.request.use(
        (config) => {
            const token = store.getState().auth.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    apiClient.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // Don't auto-redirect on 401 - let ProtectedRoute handle it
            // to avoid redirect loops
            return Promise.reject(error);
        }
    );
};

export default apiClient;
