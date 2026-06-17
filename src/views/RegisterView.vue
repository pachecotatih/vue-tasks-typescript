<template>
    <div :class="[
            'min-h-screen flex items-center justify-center bg-tasks-gray-50 dark:bg-tasks-gray-900',
            'py-12 px-4 sm:px-6 lg:px-8'
        ]"
    >
       <div class="max-w-md w-full space-y-8">
            <div class="text-center">
                <div class="flex justify-center items-center gap-2 mb-6">
                    <BookOpenCheck class="h-8 w-8 text-tasks-pink-500 dark:text-tasks-pink-400"/>
                    <h1 class="text-3xl font-bold text-tasks-gray-900 dark:text-white">Tasks</h1>
                </div>
                <h2 class="text-2xl font-bold text-tasks-gray-900 dark:text-white">Crie sua conta</h2>
                <p class="mt-2 text-sm text-tasks-gray-600 dark:text-tasks-gray-400">
                    Ou 
                    <router-link 
                        to="/login" 
                        :class="[
                            'font-medium text-tasks-pink-500 hover:text-tasks-pink-900',  
                            'dark:text-tasks-pink-400 dark:hover:text-tasks-pink-300 transition-colors'
                        ]">
                        Faça o login
                    </router-link>
                </p>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
                <div class="space-y-4">
                    <div>
                        <label for="username" class="sr-only">
                            Usuário
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User class="h-5 w-5 text-tasks-gray-500 dark:text-tasks-gray-400 z-10" />
                            </div>
                            <input 
                                v-model="form.username"
                                type="text" 
                                id="username" 
                                name="username" 
                                required 
                                placeholder="Digite o nome do seu Usuário"
                                :class="[
                                    'relative block w-full pl-10 pr-3 py-3 border border-tasks-gray-300',
                                    'dart:border-tasks-gray-700 placeholder-tasks-gray-500 dark:placeholder-tasks-gray-400',
                                    'text-tasks-gray-900 dark:text-white rounded-lg bg-white dark:bg-tasks-gray-800',
                                    'focus:outline-none focus:ring-tasks-pink-500 focus:border-tasks-pink-500 transition-colors'
                                ]"
                            >
                        </div>
                    </div>
                    <div>
                        <label for="password" class="sr-only">
                            Senha
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock class="h-5 w-5 text-tasks-gray-500 dark:text-tasks-gray-400 z-10" />
                            </div>
                            <input 
                                v-model="form.password"
                                type="password" 
                                id="password" 
                                name="password" 
                                required 
                                placeholder="Digite sua Senha"
                                :class="[
                                    'relative block w-full pl-10 pr-3 py-3 border border-tasks-gray-300',
                                    'dart:border-tasks-gray-700 placeholder-tasks-gray-500 dark:placeholder-tasks-gray-400',
                                    'text-tasks-gray-900 dark:text-white rounded-lg bg-white dark:bg-tasks-gray-800',
                                    'focus:outline-none focus:ring-tasks-pink-500 focus:border-tasks-pink-500 transition-colors'
                                ]"
                            >
                            <button 
                                type="button"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                @click="togglePasswordVisibility"
                            >
                                <Eye v-if="showPassword" class="h-5 w-5 text-tasks-gray-400 hover:text-tasks-gray-600 dark:text-tasks-gray-300 cursor-pointer" />
                                <EyeOff v-else class="h-5 w-5 text-tasks-gray-400 hover:text-tasks-gray-600 dark:text-tasks-gray-300 cursor-pointer" />
                            </button>
                        </div>
                    </div>
                    <button 
                        type="submit"
                        :class="[
                            'group relative w-full flex justify-center py-2 px-4 border border-transparent',
                            'text-sm font-medium rounded-md text-white bg-tasks-pink-500 hover:bg-tasks-pink-600',
                            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tasks-pink-500',
                            'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        ]"
                        >
                        <UserPlus class="h5 w5 mr-2"/>
                        Criar Conta
                    </button>
                </div>
            </form>
             <div v-if="authStore?.error" class="mt-6 bg-red-300 text-red-600 p-4 font-bold rounded-lg">
                <p>{{ authStore?.error }}</p>
            </div>

       </div>
    </div>
</template>
<script>
    import { BookOpenCheck, Eye, EyeOff, Lock, User, UserPlus } from 'lucide-vue-next';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../store/authStore';
    export default {
        name: 'RegisterView',
        components: {
            BookOpenCheck,
            User,
            Lock,
            Eye,
            EyeOff,
            UserPlus
        },
        setup() {
            const router = useRouter();
            const showPassword = ref(false);
            const authStore = useAuthStore();
            const form = ref({
                username: '',
                password: ''
            });

            const togglePasswordVisibility = () => {
                showPassword.value = !showPassword.value;
                const passwordInput = document.getElementById('password');
                if(passwordInput) {
                    passwordInput.type = showPassword.value ? 'text' : 'password';
                }
            };

            const handleRegister = async () => {
                try {
                   await authStore.register(form.value);
                } catch (error) {
                    console.error(error);
                }
            };


            return {
                togglePasswordVisibility,
                showPassword, 
                authStore, 
                form, 
                handleRegister};
        }
    }
</script>