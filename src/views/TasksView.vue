
<template>
    <div>
        <div class="max-w-4xl mx-auto space-y-6">
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-tasks-gray-900 dark:text-white">
                    Minhas Tarefas
                </h1>
            </div>

            <TaskForm 
                :loading="taskStore.loading"
                @submit="handleCreateTask" 
            />

            <div 
                v-if="taskStore.error"
                class="bg-red-300 text-red-600 p-4 text-center font-bold rounded-lg"
            >
                <p>{{ taskStore.error }}</p>
            </div>

            <div v-if="taskStore.loading && taskStore.tasks.length === 0" class="text-center py-8">
                <p class="text-tasks-gray-600 dark:text-tasks-gray-400">
                    Carregando tarefas...
                </p>
            </div>

            <div v-else-if="taskStore.tasks.length === 0 && !taskStore.loading" class="text-center py-8">
                <p class="text-tasks-gray-600 dark:text-tasks-gray-400">Nenhuma tarefa cadastrada.</p>
            </div>

            <div v-else>
                <TaskList 
                    title="Pendentes" 
                    :tasks="taskStore.pendingTasks"
                />
                <TaskList 
                    title="Concluídas" 
                    :tasks="taskStore.completedTasks"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import { onMounted } from 'vue';
    import TaskForm from '../components/tasks/TaskForm.vue';
    import { useTasksStore } from '../store/tasksStore.ts';
    import TaskList from '../components/tasks/TaskList.vue';

    export default {
        name: 'TasksView',
        components: {
            TaskForm,
            TaskList
        },
        setup() {
            const taskStore = useTasksStore();

            onMounted(() => taskStore.loadTasks());

            const handleCreateTask = async (title) => {
                try {
                    await taskStore.createTask(title);
                } catch (error) {
                    console.error('Erro ao criar tarefa', error);
                }
            };

            

            return {
                taskStore,
                handleCreateTask
            }
        }
    }

</script>
