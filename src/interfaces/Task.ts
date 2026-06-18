export interface Task {
    id: number;
    titulo: string;
    done: boolean;
}

export interface CreateTaskData {
    titulo: string;
    done: boolean;
}

export interface UpdateTaskData {
    titulo?: string;
    done?: boolean;
}