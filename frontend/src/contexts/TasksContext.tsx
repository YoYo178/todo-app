import { createContext, type FC, type ReactNode, useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";

import { useGetTasksQuery } from "../hooks/network/tasks/useGetTasksQuery";

import type { ITask } from "../types/task.types";
import type { ReactSetState } from "../types/react.types";
import { useAuthContext } from "./AuthContext";

interface TaskProviderProps {
    children: ReactNode;
}

interface TaskValues {
    tasks: ITask[];
    setTasks: ReactSetState<ITask[]>;
}

export const TaskContext = createContext<TaskValues | null>(null)

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
    const { auth } = useAuthContext();
    const isLoggedIn = !!auth;

    const [tasks, setTasks] = useState<ITask[]>([])
    const { data, error } = useGetTasksQuery({ queryKey: ['tasks'] });

    useEffect(() => {
        if (!data || !isLoggedIn)
            return;

        setTasks(data?.data?.tasks || []);
    }, [data, isLoggedIn])

    if (error) {
        if ((error as AxiosError).status !== 401)
            return <div>Error!</div>
    }

    return (
        <TaskContext value={{ tasks, setTasks }}>
            {children}
        </TaskContext>
    )
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (!context)
        throw new Error("[useTasksContext] Context is NULL!");

    return context;
}