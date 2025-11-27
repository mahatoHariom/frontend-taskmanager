import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { authService } from '@/services/auth.service';
import { setUser, clearUser } from '@/store/slices/authSlice';
import { toast } from 'sonner';

export function useRegister() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
            authService.register(name, email, password),
        onSuccess: (data) => {
            dispatch(setUser(data.user));
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            toast.success('Registration successful!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.error || 'Registration failed';
            toast.error(message);
        },
    });
}

export function useLogin() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            authService.login(email, password),
        onSuccess: (data) => {
            dispatch(setUser(data.user));
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
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
            dispatch(clearUser());
            queryClient.clear();
            toast.success('Logged out successfully');
        },
        onError: (error: any) => {
            const message = error.response?.data?.error || 'Logout failed';
            toast.error(message);
        },
    });
}

export function useCurrentUser() {
    const dispatch = useDispatch();

    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const data = await authService.getCurrentUser();
            dispatch(setUser(data.user));
            return data.user;
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
