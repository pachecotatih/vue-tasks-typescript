import type { AuthResponse } from "../interfaces/AuthResponse";
import type { LoginCredentials } from "../interfaces/LoginCredentials";
import {api} from "./api";

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