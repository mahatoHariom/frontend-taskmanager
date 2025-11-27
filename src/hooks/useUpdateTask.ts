import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { UpdateTaskData } from '@/types';
import { toast } from 'sonner';

interface UpdateTaskParams {
    id: string;
    data: UpdateTaskData;
}

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: UpdateTaskParams) => taskService.updateTask(id, data),
        onSuccess: () => {
            // Invalidate and refetch tasks query
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update task');
        },
    });
}
