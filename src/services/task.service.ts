import apiClient from '@/lib/axios';
import { TasksResponse, Task, CreateTaskData, UpdateTaskData } from '@/types';

export const taskService = {
    async getTasks(
        page: number = 1,
        limit: number = 10,
        sortBy: string = 'createdAt',
        sortOrder: 'asc' | 'desc' = 'desc',
        priority?: string
    ): Promise<TasksResponse> {
        const response = await apiClient.get<TasksResponse>('/tasks', {
            params: { page, limit, sortBy, sortOrder, priority },
        });
        return response.data;
    },

    async createTask(data: CreateTaskData): Promise<{ message: string; task: Task }> {
        const response = await apiClient.post<{ message: string; task: Task }>('/tasks', data);
        return response.data;
    },

    async updateTask(id: string, data: UpdateTaskData): Promise<{ message: string; task: Task }> {
        const response = await apiClient.put<{ message: string; task: Task }>(`/tasks/${id}`, data);
        return response.data;
    },

    async deleteTask(id: string): Promise<{ message: string }> {
        const response = await apiClient.delete<{ message: string }>(`/tasks/${id}`);
        return response.data;
    },
};
