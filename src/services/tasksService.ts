import type { CreateTaskData, Task, UpdateTaskData } from "../interfaces/Task";
import {api} from "./api";

export const tasksService = {
    async getAll(): Promise<Task[]>{
        const response = await api.get<Task[]>('/tasks');
        return response.data;
    },
    async create(task: CreateTaskData): Promise<Task> {
        const response = await api.post<Task>('/tasks', task);
        return response.data;
    },
    async update(id: number, task: UpdateTaskData): Promise<Task> {
        const response = await api.put<Task>(`/tasks/${id}`, task);
        return response.data;
    },
    async delete(id: number): Promise<void> {
        await api.delete(`/tasks/${id}`);
    },
}