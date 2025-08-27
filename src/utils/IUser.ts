export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    createdAt?: string;
}


export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}