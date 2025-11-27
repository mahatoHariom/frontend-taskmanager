import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@/hooks/useAuth';
import { registerSchema, RegisterFormData } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckSquare } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();
    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        const { confirmPassword, ...registerData } = data;
        registerMutation.mutate(registerData, {
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
                        <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
                        <p className="text-muted-foreground">
                            Enter your details to get started with TaskManager
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                {...register('name')}
                                disabled={isSubmitting || registerMutation.isPending}
                                className="h-11"
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive font-medium">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...register('email')}
                                disabled={isSubmitting || registerMutation.isPending}
                                className="h-11"
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive font-medium">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register('password')}
                                disabled={isSubmitting || registerMutation.isPending}
                                className="h-11"
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive font-medium">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register('confirmPassword')}
                                disabled={isSubmitting || registerMutation.isPending}
                                className="h-11"
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive font-medium">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-11 text-base"
                            disabled={isSubmitting || registerMutation.isPending}
                        >
                            {registerMutation.isPending ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-primary hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Hero/Image */}
            <div className="hidden lg:flex flex-col justify-center p-12 bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/0" />
                <div className="relative z-10 max-w-lg mx-auto text-center lg:text-left">
                    <h2 className="text-4xl font-bold tracking-tight mb-6">
                        Start organizing your work today.
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Join thousands of professionals who trust TaskManager to keep their projects on track.
                        Simple, powerful, and built for productivity.
                    </p>
                </div>
            </div>
        </div>
    );
}
