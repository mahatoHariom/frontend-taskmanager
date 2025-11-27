export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface Task {
    id: string;
    userId: string;
    title: string;
    description: string | null;
    priority: Priority;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface TasksResponse {
    tasks: Task[];
    pagination: PaginationInfo;
}

export interface AuthResponse {
    message: string;
    user: User;
    token?: string;
}

export interface CreateTaskData {
    title: string;
    description?: string;
    priority: Priority;
    endDate: string;
}

export interface UpdateTaskData {
    title?: string;
    description?: string;
    priority?: Priority;
    endDate?: string;
}

export interface ApiError {
    error: string;
    errors?: Array<{ msg: string; param: string }>;
}
