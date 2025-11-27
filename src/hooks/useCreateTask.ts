import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { CreateTaskData } from '@/types';
import { toast } from 'sonner';

export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTaskData) => taskService.createTask(data),
        onSuccess: () => {
            // Invalidate and refetch tasks query
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task created successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to create task');
        },
    });
}
