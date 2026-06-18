<template>
    <form 
    @submit.prevent="handleSubmit"
        :class="[
            'bg-white dark:bg-tasks-gray-800 p-6 rounded-lg ',
            'border border-tasks-gray-200 dark:border-tasks-gray-700'
        ]"
    >
        <div class="flex gap-4">
            <input 
                type="text"
                placeholder="Digite o título da tarefa"
                v-model="taskTitle"
                required
                :class="[
                    'flex-1 px-4 py-3 border border-tasks-gray-300 dark:border-tasks-gray-700',
                    'rounded-lg bg-white dark:bg-tasks-gray-800 text-tasks-gray-900 dark:text-white',
                    'focus:outline-none focus:ring-tasks-pink-500 focus:border-tasks-pink-500'
                ]"
            >
            <button 
                type="submit"
                :disabled="loading"
                :class="[
                    'px-6 py-3 bg-tasks-pink-500 hover:bg-tasks-pink-600 text-white',
                    'rounded-lg font-medium transition-colors cursor-pointer',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'flex items-center gap-2'
                ]"
            >
                <Plus class="h-5 w-5"/>
                Adicionar
            </button>
        </div>
    </form>
</template>
<script>
import { Plus } from 'lucide-vue-next';
import { ref } from 'vue';

    export default {
        name: 'TaskForm',
        components: {
            Plus
        },
        emits: ['submit'],
        props: {
            loading: {
                type: Boolean,
                default: false
            },
        },
        setup(props, {emit}) {
            const taskTitle = ref('');
            const handleSubmit = () => {
                if(!taskTitle.value.trim()) return;
                emit('submit', taskTitle.value.trim());
                taskTitle.value = '';
            }
            return {
                taskTitle,
                handleSubmit
            }
        }
    }
</script>