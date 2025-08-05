import { createContext, type FC, type ReactNode, useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";

import { useGetMeQuery } from "../hooks/network/auth/useGetMeQuery";

import type { IUser } from "../types/user.types";
import type { ReactSetState } from "../types/react.types";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthValues {
    auth: Partial<IUser> | null;
    setAuth: ReactSetState<Partial<IUser> | null>;
}

export const AuthContext = createContext<AuthValues | null>(null)

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<Partial<IUser> | null>(null)
    const { data, error } = useGetMeQuery({ queryKey: ['auth'] });

    useEffect(() => {
        if (!data)
            return;

        const { id, name, email } = data?.data?.user || {};
        setAuth({ id, name, email });
    }, [data])

    if (error) {
        if ((error as AxiosError).status !== 401)
            return <div>Error!</div>
    }

    return (
        <AuthContext value={{ auth, setAuth }}>
            {children}
        </AuthContext>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("[useAuthContext] Context is NULL!");

    return context;
}