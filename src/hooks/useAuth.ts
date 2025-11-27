import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { authService } from '@/services/auth.service';
import { setCredentials, clearCredentials } from '@/store/slices/authSlice';
import { toast } from 'sonner';

export function useRegister() {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
            authService.register(name, email, password),
        onSuccess: (data) => {
            if (data.token && data.user) {
                dispatch(setCredentials({ user: data.user, token: data.token }));
            }
            toast.success('Registration successful!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.error || 'Registration failed';
            toast.error(message);
        },
    });
}

export function useLogin() {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            authService.login(email, password),
        onSuccess: (data) => {
            if (data.token && data.user) {
                dispatch(setCredentials({ user: data.user, token: data.token }));
            }
            toast.success('Login successful!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.error || 'Login failed';
            toast.error(message);
        },
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            dispatch(clearCredentials());
            queryClient.clear();
            toast.success('Logged out successfully');
            window.location.href = '/login'; // Force navigation
        },
        onError: (error: any) => {
            const message = error.response?.data?.error || 'Logout failed';
            toast.error(message);
        },
    });
}
