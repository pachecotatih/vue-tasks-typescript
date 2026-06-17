import {defineStore} from "pinia";
import {ref, computed} from "vue";
import { authService } from "@/services/authService";
import {storage} from "@/utils/storage";
import {useRouter} from "vue-router";

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const user = ref(null);
    const token = ref(storage.get('token'));
    const loading = ref(false);
    const error = ref(null);

    const isAuthenticated = computed(() => !!token.value);
    const currentUser = computed(() => user.value);
    const isLoading = computed(() => loading.value);
    const hasError = computed(() => error.value);
    const userName = computed(() => user.value?.username || '');

    const login = async (credentials) => {
        loading.value = true;
        error.value = null;
        try {
            
            const response = await authService.login(credentials);
            user.value = {
                id: response.userId,
                username: response.username
            };
            storage.set('token', response.token);
            storage.set('user', JSON.stringify(user.value));
            router.push('/tasks');

            return response;
        } catch (e) {
            if(e.isAuthError) {
                error.value = e.message;
                throw e;
            }
            error.value = e.response?.data?.message || 'Ocorreu um erro ao fazer login';
            console.error('Erro ao fazer login', e);
            throw e;
        } finally {
            loading.value = false;
        }

        
    }
    const checkAuth = () => {
            const savedToken = storage.get('token');
            const savedUser = storage.get('user');

            if (savedToken && savedUser) {
                user.value = JSON.parse(savedUser);
                token.value = savedToken;
            }
        }

        return {
            user,
            token,
            loading,
            error,
            isAuthenticated,
            currentUser,
            isLoading,
            hasError,
            userName,
            login,
            checkAuth
        }
});