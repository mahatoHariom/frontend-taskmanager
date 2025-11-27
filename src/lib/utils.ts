import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Priority } from "@/types"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isOverdue(endDate: string): boolean {
    const taskDate = new Date(endDate);
    const now = new Date();

    // Set both dates to start of day (midnight) for date-only comparison
    taskDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    // A task is overdue only if the due date is before today (not including today)
    return taskDate.getTime() < now.getTime();
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export function formatDateTime(date: string): string {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function getPriorityColor(priority: Priority): "default" | "secondary" | "destructive" | "outline" {
    switch (priority) {
        case Priority.HIGH:
            return 'destructive'
        case Priority.MEDIUM:
            return 'default'
        case Priority.LOW:
            return 'secondary'
        default:
            return 'default'
    }
}

export function getPriorityLabel(priority: Priority): string {
    switch (priority) {
        case Priority.HIGH:
            return 'High'
        case Priority.MEDIUM:
            return 'Medium'
        case Priority.LOW:
            return 'Low'
        default:
            return priority
    }
}
