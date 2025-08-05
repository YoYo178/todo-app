
export type HTTP_METHODS = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS';

type AUTH_ROUTES = 'LOGIN' | 'LOGOUT' | 'SIGNUP' | 'GET_ME';
type TASK_ROUTES = 'GET_ALL_TASKS' | 'GET_TASK_BY_ID' | 'CREATE_TASK' | 'UPDATE_TASK' | 'DELETE_TASK';

type API_ROUTES = AUTH_ROUTES | TASK_ROUTES;

export type Endpoint = {
    URL: string;
    METHOD: HTTP_METHODS;
}

export type Endpoints = {
    [key in API_ROUTES]: Endpoint
}