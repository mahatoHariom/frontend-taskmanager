import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, CheckSquare, LogOut, User } from 'lucide-react';
import { useLogout } from '@/hooks/useAuth';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const location = useLocation();
    const logoutMutation = useLogout();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <div className={cn("pb-12 min-h-screen border-r bg-card", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="flex items-center gap-2 px-4 mb-8">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <CheckSquare className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-primary">TaskManager</h2>
                    </div>
                    <div className="space-y-1">
                        <Button
                            variant={location.pathname === "/" ? "secondary" : "ghost"}
                            className="w-full justify-start gap-2"
                            asChild
                        >
                            <Link to="/">
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                        </Button>

                    </div>
                </div>
            </div>
            <div className="px-3 py-2 mt-auto absolute bottom-0 w-full border-t bg-card">
                <div className="flex items-center gap-3 px-4 py-4">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
