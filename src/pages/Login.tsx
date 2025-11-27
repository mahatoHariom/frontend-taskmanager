import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/useAuth';
import { loginSchema, LoginFormData } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckSquare } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                navigate('/');
            },
        });
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 bg-background">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                                <CheckSquare className="h-6 w-6 text-primary-foreground" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                        <p className="text-muted-foreground">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...register('email')}
                                disabled={isSubmitting || loginMutation.isPending}
                                className="h-11"
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive font-medium">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">

                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register('password')}
                                disabled={isSubmitting || loginMutation.isPending}
                                className="h-11"
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive font-medium">{errors.password.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-11 text-base"
                            disabled={isSubmitting || loginMutation.isPending}
                        >
                            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-primary hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Hero/Image */}
            <div className="hidden lg:flex flex-col justify-center p-12 bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/0" />
                <div className="relative z-10 max-w-lg mx-auto text-center lg:text-left">
                    <h2 className="text-4xl font-bold tracking-tight mb-6">
                        Manage your tasks with elegance and efficiency.
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Stay organized, focused, and get more done with our intuitive task management dashboard.
                        Designed for professionals who value productivity.
                    </p>
                </div>
            </div>
        </div>
    );
}

