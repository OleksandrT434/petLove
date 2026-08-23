"use client";

import { createContext,useContext, useState, useEffect} from "react";
import type { CurrentUser } from "@/types/auth";
import { AuthApi } from "@/lib/api/clientApi";


type AuthContextType = {
    user: CurrentUser | null;
    login: (user: CurrentUser) => void;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children,}: {children: React.ReactNode;}) {

    const [user, setUser] = useState<CurrentUser | null>(null);
    const logout = async () => {
    try {
        await AuthApi.signOut();
    } catch (error) {
        console.error("LOGOUT ERROR:", error);
    } finally {
        localStorage.removeItem("token");
        setUser(null);
    }
};
const login = (currentUser: CurrentUser) => {
    setUser(currentUser);
};

useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        return;}
    const checkAuth = async () => {
        try {
            const currentUser = await AuthApi.getCurrent();
            setUser(currentUser);
        } catch (error) {
            console.error("AUTH ERROR:", error);
            localStorage.removeItem("token");
        }
    };
    checkAuth();
}, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}