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
            <BookOpenCheck class="ml-4 h-8 w-8 text-tasks-pink-500 dark:text-tasks-pink-400"/>
            <span v-if="isAuthenticated" class="text-tasks-gray-700 dark:text-tasks-gray-300">Olá, {{ userName }}</span>
            <MenuItem v-if="!isAuthenticated" redirect-to="/login" label="Login"/>
            <MenuItem v-if="!isAuthenticated" redirect-to="/register" label="Cadastre-se"/>
            <MenuItem v-if="isAuthenticated" redirect-to="/tasks" label="Tarefas"/>
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
            {{ isDark ? 'Modo Claro' : 'Modo Escuro' }}
        </button>
        </div>
        
      </header>
</template>

<script>
import { BookOpenCheck } from 'lucide-vue-next';
import { useAuthStore } from '../store/authStore.ts';
import MenuItem from './MenuItem.vue';
import { useTheme } from '@/composables/useTheme';
import { computed } from 'vue';
export default {
    name: 'NavBar',
    components: {
        MenuItem,
        BookOpenCheck
    },
    setup() {
        const {isDark, toggleTheme} = useTheme();
        const authStore = useAuthStore();
        const isAuthenticated = computed(() => authStore.isAuthenticated);
        const userName = computed(() => authStore.userName);
        return {
            isDark,
            toggleTheme,
            isAuthenticated,
            userName
        }
    }
}
</script>