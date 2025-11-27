import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/useAuth';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isLoading, isError, data } = useCurrentUser();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Redirect to login if authentication check failed or no user data
    // Only check after loading is complete to avoid race conditions
    if (isError || !data) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
