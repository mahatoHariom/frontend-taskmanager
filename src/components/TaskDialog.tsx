import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task, Priority, CreateTaskData, UpdateTaskData } from '@/types';
import { taskSchema, TaskFormData } from '@/lib/schemas';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateTask } from '@/hooks/useCreateTask';
import { useUpdateTask } from '@/hooks/useUpdateTask';

interface TaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task?: Task | null;
}

export default function TaskDialog({ open, onOpenChange, task }: TaskDialogProps) {
    const createTaskMutation = useCreateTask();
    const updateTaskMutation = useUpdateTask();
    const isEditing = !!task;

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            priority: Priority.MEDIUM,
            endDate: '',
        },
    });

    useEffect(() => {
        if (task) {
            const date = new Date(task.endDate);
            const formattedDate = date.toISOString().slice(0, 16);
            reset({
                title: task.title,
                description: task.description || '',
                priority: task.priority,
                endDate: formattedDate,
            });
        } else {
            reset({
                title: '',
                description: '',
                priority: Priority.MEDIUM,
                endDate: '',
            });
        }
    }, [task, open, reset]);

    const onSubmit = async (data: TaskFormData) => {
        const taskData = {
            title: data.title,
            description: data.description || undefined,
            priority: data.priority,
            endDate: new Date(data.endDate).toISOString(),
        };

        try {
            if (isEditing) {
                await updateTaskMutation.mutateAsync({ id: task.id, data: taskData as UpdateTaskData });
            } else {
                await createTaskMutation.mutateAsync(taskData as CreateTaskData);
            }
            onOpenChange(false);
        } catch (error) {
            // Error handling is done in the mutation hooks
        }
    };

    const isPending = createTaskMutation.isPending || updateTaskMutation.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="sm:max-w-[500px] bg-background">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Task' : 'Create New Task'}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Update the task details below.'
                            : 'Fill in the details to create a new task.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                placeholder="Task title"
                                {...register('title')}
                                disabled={isPending || isSubmitting}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                placeholder="Task description (optional)"
                                {...register('description')}
                                disabled={isPending || isSubmitting}
                                className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">{errors.description.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority *</Label>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isPending || isSubmitting}
                                    >
                                        <SelectTrigger id="priority">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={Priority.LOW}>Low</SelectItem>
                                            <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
                                            <SelectItem value={Priority.HIGH}>High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.priority && (
                                <p className="text-sm text-red-600">{errors.priority.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">Due Date *</Label>
                            <Input
                                id="endDate"
                                type="datetime-local"
                                {...register('endDate')}
                                disabled={isPending || isSubmitting}
                            />
                            {errors.endDate && (
                                <p className="text-sm text-red-600">{errors.endDate.message}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isPending || isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending || isSubmitting}>
                            {isPending ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
