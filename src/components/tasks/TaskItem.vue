<template>
    <div 
        :draggable="true"
        @dragstart="handleDragStart"
        @dragend="tasksStore.clearDraggedTask"
        :class="[
            'bg-white dark:bg-tasks-gray-800 rounded-lg border border-tasks-gray-200 dark:border-tasks-gray-700',
            'flex items-center gap-4 transition-all',
            tasksStore.draggedTaskId === task.id ? 'opacity-50' : 'hover: shadow-md',
            task.done ? 'opacity-60':''
        ]"
    >
        <label class="relative inline-flex items-center cursor-pointer">
            <input 
                type="checkbox"
                :checked="task.done"
                class="sr-only peer"
                @change="handleToggleTask"
            />
            <div
                :class="[
                    'w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center',
                    'peer-focus:ring-2 peer-focus:ring-rocket-purple-500 peer-focus:ring-offset-2',
                    task.done 
                        ? 'bg-tasks-pink-500 border-tasks-pink-500' 
                        : 'bg-transparent border-tasks-gray-300 dark:border-tasks-gray-600',
                    
                ]"
            >
                <svg 
                    v-if="task.done"
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path 
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
        </label>
        <div class="flex-1">
            <input 
                v-model="editingTitle"
                v-if="isEditing"
                @keyup.esc="cancelTaskEdit"
                @keyup.enter="saveTaskEdit"
                :class="[
                    'w-full px-3 py-2 border border-tasks-gray-300 dark:border-tasks-700',
                    'rounded bg-white dark:bg-tasks-gray-800 text-tasks-gray-900 dark:text-white',
                    'focus:outline-none focus:ring-tasks-pink-500 focus:border-tasks-pink-500'
                ]"
            />
            <p
            v-else
            @dblclick="editingTask"
            :class="[
                'cursor-pointer select-none',
                task.done 
                ? 'line-through text-tasks-gray-500 dark:text-tasks-gray-300'
                : 'text-tasks-gray-900 dark:text-white'
            ]"
            >
                {{ task.titulo }}
            </p>
        </div>
        <div class="flex gap-2">
            <button
                v-if="!isEditing"
                @click="editingTask"
                :class="[
                    'p-2 bg-tasks-gray-100 dark:bg-tasks-gray-700 text-tasks-pink-500 hover:bg-tasks-pink-400',
                    'dark:hover:bg-tasks-pink-900/30 rounded transition-colors',
                    'cursor-pointer'
                ]"
            >
            <Edit class="w-5 h-5" />
            </button>
            <button
            @click="handleDeleteTask"
            :class="[
                'p-2 bg-tasks-gray-100 dark:bg-tasks-gray-700 text-red-500 hover:bg-red-50',
                'dark:hover:bg-red-900/30 rounded transition-colors',
                'cursor-pointer'
            ]"
            >
                <Trash class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>
<script>
    import { computed, ref } from 'vue';
    import { useTasksStore } from '../../store/tasksStore';
    import { Edit, Trash } from 'lucide-vue-next';
    import Swal from 'sweetalert2';

    export default {
        name: 'TaskItem',
        components: {
            Edit, Trash
        },
        props: {
            task: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            const editingTitle = ref('');
            const tasksStore = useTasksStore();

            const editingTask = () => {
                editingTitle.value = props.task.titulo;
                tasksStore.setEditingTask(props.task);
            }
            const isEditing = computed(() => tasksStore.editingTaskId?.value === props.task.id);

            const cancelTaskEdit = () => {
                editingTitle.value = '';
                tasksStore.setEditingTask(null);
                
            }
            const saveTaskEdit = async () => {
                try {
                    if (!editingTitle.value.trim()) {
                        cancelTaskEdit();
                        return;
                    }
                    await tasksStore.updateTask(props.task.id, editingTitle.value);
                    alert('Tarefa atualizada com sucesso!');
                } catch (error) {
                    console.error('Erro ao atualizar a tarefa:',error);
                } finally {
                    cancelTaskEdit();
                }
            }
            const handleToggleTask = async () => {
                try {
                    await tasksStore.toggleTask(props.task.id, !props.task.done);
                } catch (err) {
                    console.error("Erro ao atualizar tarefa:", err);
                }
            };
            const handleDeleteTask = async () => {
                try {
                    const result = await Swal.fire({
                        title: 'Excluir Tarefa?',
                        text: 'Esta ação não pode ser desfeita.',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#E25393',
                        cancelButtonColor: '#737380',
                        confirmButtonText: 'Sim, excluir',
                        cancelButtonText: 'Cancelar',
                    });
                    if(result.isConfirmed) {
                        tasksStore.deleteTask(props.task.id);
                    }
                    Swal.fire({
                        title: 'Excluir Tarefa',
                        text: 'A tarefa foi removida com sucesso!',
                        icon: 'success'
                    })
                } catch (error) {
                    Swal.fire({
                        title: 'Excluir Tarefa',
                        text: 'Ocorreu um erro ao excluir a tarefa!',
                        icon: 'error'
                    });
                    console.error(error);
                }
            }
            const handleDragStart = (event) => {
                tasksStore.setDraggedTask(props.task);
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', props.task.id.toString());
            }
            return {
                handleToggleTask,
                isEditing,
                editingTask,
                editingTitle,
                cancelTaskEdit,
                saveTaskEdit,
                handleDeleteTask,
                handleDragStart,
                tasksStore
            };
        },
    }
</script>