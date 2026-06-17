import {api} from "./api";
export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    userId: number;
    username: string;
    token: string;
}
export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    async register(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', credentials);
        return response.data;
    }
}