import { useQuery } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';

interface UseTasksParams {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    priority?: string;
}

export function useTasks({ page, limit, sortBy, sortOrder, priority }: UseTasksParams) {
    return useQuery({
        queryKey: ['tasks', { page, limit, sortBy, sortOrder, priority }],
        queryFn: () => taskService.getTasks(page, limit, sortBy, sortOrder, priority),
        staleTime: 30000, // Consider data fresh for 30 seconds
    });
}
