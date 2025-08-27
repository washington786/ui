/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';
import { removeToken, setToken, getToken } from '../utils/auth';
import type { AuthState, User } from '../utils/IUser';

const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            const token = getToken();
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const decoded = parseJwt(token);
                if (!decoded) throw new Error('Invalid token');

                setUser({
                    id: decoded.userId,
                    name: decoded.name || 'User',
                    email: decoded.email,
                    role: decoded.role || 'user',
                });
            } catch (err: any) {
                console.log(err);
                removeToken();
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await api.post('/users/login', { email, password });
        const { token, user } = res.data;

        setToken(token);
        setUser(user);
    };

    const logout = () => {
        removeToken();
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const parseJwt = (token: string) => {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (e: any) {
        return null;
    }
};

export const useAuthCtx = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthCtx must be used within an AuthProvider');
    }
    return context;
};