import { Task } from '@/types';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeleteTask } from '@/hooks/useDeleteTask';

interface DeleteTaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task: Task | null;
}

export default function DeleteTaskDialog({ open, onOpenChange, task }: DeleteTaskDialogProps) {
    const deleteTaskMutation = useDeleteTask();

    const handleDelete = async () => {
        if (task) {
            try {
                await deleteTaskMutation.mutateAsync(task.id);
                onOpenChange(false);
            } catch (error) {
                // Error handling is done in the mutation hook
            }
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the task
                        {task && <span className="font-semibold"> "{task.title}"</span>}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleteTaskMutation.isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={deleteTaskMutation.isPending}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {deleteTaskMutation.isPending ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
