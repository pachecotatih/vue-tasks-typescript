export const storage = {
    set(key: string, value: string) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.error('Erro ao salvar item no localStorage', e);
        }
    },
    get(key: string) {
       try {
            return localStorage.getItem(key);
       } catch (e) {
            console.error('Erro ao obter item do localStorage', e);
       }
    },
    remove(key: string) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Erro ao remover item do localStorage', error);
        }
    }
}