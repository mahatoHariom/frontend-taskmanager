import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTasks } from '@/hooks/useTasks';
import { useLogout } from '@/hooks/useAuth';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import TaskCard from '@/components/TaskCard';
import TaskDialog from '@/components/TaskDialog';
import DeleteTaskDialog from '@/components/DeleteTaskDialog';
import { Sidebar } from '@/components/Sidebar';
import { Plus, ChevronLeft, ChevronRight, ListTodo, AlertCircle, Clock, LogOut, CheckSquare } from 'lucide-react';

export default function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const logoutMutation = useLogout();

    // Get state from URL params
    const page = parseInt(searchParams.get('page') || '1');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
    const priority = searchParams.get('priority') || 'ALL';

    // Fetch tasks using React Query
    const { data, isLoading, error } = useTasks({
        page,
        limit: 10,
        sortBy,
        sortOrder,
        priority: priority !== 'ALL' ? priority : undefined,
    });

    const tasks = data?.tasks || [];
    const pagination = data?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 10,
        hasNextPage: false,
        hasPreviousPage: false,
    };

    const [taskDialogOpen, setTaskDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const updateUrlParams = (updates: Record<string, string>) => {
        const newParams = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([key, value]) => {
            newParams.set(key, value);
        });
        setSearchParams(newParams);
    };

    const handleEditTask = (task: Task) => {
        setSelectedTask(task);
        setTaskDialogOpen(true);
    };

    const handleDeleteTask = (task: Task) => {
        setSelectedTask(task);
        setDeleteDialogOpen(true);
    };

    const handleCreateTask = () => {
        setSelectedTask(null);
        setTaskDialogOpen(true);
    };

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    const handleSortChange = (value: string) => {
        const [newSortBy, newSortOrder] = value.split('-');
        updateUrlParams({
            sortBy: newSortBy,
            sortOrder: newSortOrder,
            page: '1', // Reset to first page
        });
    };

    const handlePriorityFilterChange = (value: string) => {
        updateUrlParams({
            priority: value,
            page: '1', // Reset to first page
        });
    };

    const handlePageChange = (newPage: number) => {
        updateUrlParams({ page: newPage.toString() });
    };

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <div className="hidden md:block w-64 fixed inset-y-0 z-50">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 md:pl-64">
                <div className="container mx-auto p-6 md:p-8 max-w-7xl">
                    {/* Mobile Header */}
                    <div className="md:hidden flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <CheckSquare className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-primary">TaskManager</h2>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleLogout}>
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                            <p className="text-muted-foreground mt-1">Manage your tasks and track your progress.</p>
                        </div>
                        <Button onClick={handleCreateTask} size="lg" className="shadow-lg shadow-primary/20">
                            <Plus className="mr-2 h-5 w-5" />
                            New Task
                        </Button>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium text-primary">Total Tasks</CardTitle>
                                <ListTodo className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{pagination.totalCount || 0}</div>
                                <p className="text-xs text-muted-foreground mt-1">Active tasks in your list</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium text-destructive">Overdue</CardTitle>
                                <Clock className="h-4 w-4 text-destructive" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {tasks.filter(t => {
                                        const taskDate = new Date(t.endDate);
                                        const now = new Date();
                                        taskDate.setHours(0, 0, 0, 0);
                                        now.setHours(0, 0, 0, 0);
                                        return taskDate.getTime() < now.getTime();
                                    }).length || 0}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Tasks past their due date</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters & Content */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <h2 className="text-xl font-semibold tracking-tight">Your Tasks</h2>
                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                <Select value={priority} onValueChange={handlePriorityFilterChange}>
                                    <SelectTrigger className="w-full sm:w-[150px]">
                                        <SelectValue placeholder="Filter by Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">All Priorities</SelectItem>
                                        <SelectItem value="LOW">Low</SelectItem>
                                        <SelectItem value="MEDIUM">Medium</SelectItem>
                                        <SelectItem value="HIGH">High</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="createdAt-desc">Newest First</SelectItem>
                                        <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                                        <SelectItem value="endDate-asc">Due Date (Earliest)</SelectItem>
                                        <SelectItem value="endDate-desc">Due Date (Latest)</SelectItem>
                                        <SelectItem value="priority-desc">Priority (High to Low)</SelectItem>
                                        <SelectItem value="priority-asc">Priority (Low to High)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        {isLoading && tasks.length === 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <Skeleton key={i} className="h-40 w-full rounded-xl" />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-destructive/5 rounded-xl border border-destructive/20">
                                <AlertCircle className="h-10 w-10 text-destructive mb-4" />
                                <h3 className="text-lg font-semibold text-destructive">Error loading tasks</h3>
                                <p className="text-muted-foreground">Please try refreshing the page.</p>
                            </div>
                        ) : tasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl bg-muted/30">
                                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                    <ListTodo className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                                <p className="text-muted-foreground mb-6 max-w-sm">
                                    {priority !== 'ALL'
                                        ? `No ${priority.toLowerCase()} priority tasks found.`
                                        : "You haven't created any tasks yet. Start by adding a new task to your list."}
                                </p>
                                <Button onClick={handleCreateTask}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create First Task
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {tasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onEdit={handleEditTask}
                                            onDelete={handleDeleteTask}
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.totalCount > 0 && (
                                    <div className="flex items-center justify-center gap-2 mt-8">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))}
                                            disabled={!pagination.hasPreviousPage}
                                        >
                                            <ChevronLeft className="h-4 w-4 mr-1" />
                                            Previous
                                        </Button>
                                        <div className="text-sm font-medium mx-2">
                                            Page {pagination.currentPage} of {pagination.totalPages}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                                            disabled={!pagination.hasNextPage}
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            {/* Dialogs */}
            <TaskDialog
                open={taskDialogOpen}
                onOpenChange={setTaskDialogOpen}
                task={selectedTask}
            />
            <DeleteTaskDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                task={selectedTask}
            />
        </div>
    );
}

