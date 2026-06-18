import {defineStore} from 'pinia';
import { tasksService } from '../services/tasksService';
import {type Task} from '../interfaces/Task';
import { computed, ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const editingTaskId = ref<number | null>(null);

    const pendingTasks = computed(() => tasks.value.filter(task => !task.done));
    const completedTasks = computed(() => tasks.value.filter(task => task.done));

    const toggleTask = async (id: number, done: boolean): Promise<Task> => {
        try {
            const updatedTask = await tasksService.update(id, {done});
            const index = tasks.value.findIndex(task => task.id === id);
            if (index !== -1) {
                tasks.value[index] = updatedTask;
            }
            return updatedTask;
        } catch (e) {
            const axiosError = e as {response?: {data?: {message?: string}}};
            error.value = axiosError.response?.data?.message || 'Erro ao atualizar a tarefa';
            console.error('Erro ao atualizar a tarefa:', e);
            throw e;
        }
    }

    const setEditingTask = (task: Task | null): void => {
        editingTaskId.value = null;
        if(task) {
            editingTaskId.value = task.id;
        }
    }
    
    const loadTasks = async (): Promise<void> => {
        try {
            loading.value = true;
            error.value = null;
            tasks.value = await tasksService.getAll();
        } catch (e) {
            const axiosError = e as {response?: {data?: {message?: string}}};
            error.value = axiosError.response?.data?.message || 'Erro ao carregar as tarefas';
            console.error('Erro ao carregar as tarefas:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }
    const createTask = async (title: string): Promise<Task> => {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            error.value = 'O título da tarefa não pode estar vazio';
            return Promise.reject(new Error(error.value));
        }

        try {
            loading.value = true;
            error.value = null;
            const newTask = await tasksService.create({
                titulo: trimmedTitle,
                done: false
            });
            tasks.value.push(newTask);
            return newTask;
        } catch (e) {
            const axiosError = e as {response?: {data?: {message?: string}}};
            error.value = axiosError.response?.data?.message || 'Erro ao criar a tarefa';
            console.error('Erro ao criar a tarefa:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }
    const updateTask = async (id:number, title: string): Promise<Task | void> => {
        if(!title.trim()) return;
        try {
            loading.value = true;
            error.value = null;
            const updateTask = await tasksService.update(id, {
                titulo: title.trim(), 
                done: false
            });
            const index = tasks.value.findIndex(task => task.id === id);
            if(index !== -1) {
                tasks.value[index] = updateTask;
                
            }
            return updateTask;
            
        } catch (e) {
            const axiosError = e as {response?: {data?: {message?: string}}};
            error.value = axiosError.response?.data?.message || 'Erro ao atualizar a tarefa';
            console.error('Erro ao atualizar a tarefa:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }
    const deleteTask = async (id: number): Promise<void> => {
        try {
            loading.value = true;
            error.value = null;
            await tasksService.delete(id);
            tasks.value = tasks.value.filter(task => task.id !== id);
        } catch (e) {
            const axiosError = e as {response?: {data?: {message?: string}}};
            error.value = axiosError.response?.data?.message || 'Erro ao deletar a tarefa';
            console.error('Erro ao deletar a tarefa:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }
    return {
        tasks,
        error,
        loading,
        loadTasks,
        createTask,
        updateTask,
        deleteTask,
        pendingTasks,
        completedTasks,
        toggleTask,
        editingTaskId,
        setEditingTask
    }
});