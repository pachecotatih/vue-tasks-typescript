<template>
    <div>
        <label>
            <input 
                type="checkbox"
                :checked="task.done"
                class="sr-only peer"
                @change="handleToggle"
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
        <div>
            <p>{{ task.titulo }}</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TaskItem',
        props: {
            task: {
                type: Object,
                required: true
            }
        },
        emits: ['toggle'],
        setup(props, { emit }) {
            const handleToggle = (event) => {
                emit('toggle', props.task.id, !props.task.done);
            }
            return {
                handleToggle
            }
        }
    }
</script>