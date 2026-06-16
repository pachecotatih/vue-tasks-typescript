<template>
    <header class="
        bg-white 
        dark:bg-tasks-gray-900 
        border-b 
        border-tasks-gray-200 
        dark:border-tasks-gray-800 
        top-0 
        z-50"
    >
        <div class="flex items-center gap-4">
            <MenuItem redirect-to="/login" label="Login"/>
            <MenuItem redirect-to="/register" label="Cadastre-se"/>
            <MenuItem redirect-to="/tasks" label="Tarefas"/>
            <button
        @click="toggleTheme"
        class="
            px-4 
            py-2 
            rounded-lg 
            text-tasks-gray-600 
            dark:text-tasks-gray-300 
            bg-transparent 
            border 
            border-tasks-gray-200 
            dark:border-tasks-gray-800 
            cursor-pointer 
            transition-all 
            duration-200 
            font-medium 
            hover:bg-tasks-gray-50 
            dark:hover:bg-tasks-gray-800 
            hover:text-tasks-pink-500 
            dark:hover:text-tasks-pink-400"
        >
            {{ isDark ? 'Modo Escuro' : 'Modo Claro' }}
        </button>
        </div>
        
      </header>
</template>

<script>
import MenuItem from './MenuItem.vue';
import { useTheme } from '@/composables/useTheme';
export default {
    name: 'NavBar',
    components: {
        MenuItem
    },
    setup() {
        const {isDark, toggleTheme} = useTheme();

        return {
            isDark,
            toggleTheme
        }
    }
}
</script>