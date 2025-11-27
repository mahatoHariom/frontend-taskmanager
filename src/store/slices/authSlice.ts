import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const token = localStorage.getItem('token');
const initialState: AuthState = {
    user: null,
    isAuthenticated: !!token,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
