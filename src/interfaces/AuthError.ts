export interface AuthError extends Error {
    isAuthError?: boolean
    response?: unknown

}