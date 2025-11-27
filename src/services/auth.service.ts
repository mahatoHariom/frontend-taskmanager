import apiClient from '@/lib/axios';
import { AuthResponse } from '@/types';

export const authService = {
    async register(name: string, email: string, password: string): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/register', {
            name,
            email,
            password,
        });
        return response.data;
    },

    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/login', {
            email,
            password,
        });
        return response.data;
    },

    async logout(): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>('/logout');
        return response.data;
    },

};
