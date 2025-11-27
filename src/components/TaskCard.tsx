import { Task } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, getPriorityColor, getPriorityLabel, isOverdue } from '@/lib/utils';
import { Pencil, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const overdue = isOverdue(task.endDate);

    return (
        <Card
            className={cn(
                "group relative overflow-hidden transition-all hover:shadow-md border-l-4",
                overdue ? "border-l-destructive bg-destructive/5" : "border-l-primary"
            )}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                        <CardTitle className="text-base font-semibold leading-none tracking-tight line-clamp-1">
                            {task.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                            {task.description || "No description provided."}
                        </p>
                    </div>
                    <Badge variant={getPriorityColor(task.priority)} className="shrink-0">
                        {getPriorityLabel(task.priority)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2 text-xs font-medium">
                        {overdue ? (
                            <div className="flex items-center gap-1.5 text-destructive">
                                <AlertCircle className="h-3.5 w-3.5" />
                                <span>Overdue: {formatDate(task.endDate)}</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>Due: {formatDate(task.endDate)}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(task)}
                            className="h-7 w-7"
                        >
                            <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(task)}
                            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

