import axios from "axios";
import type { Endpoints } from "../types/api.types";

const isProduction = import.meta.env.PROD;

export const SERVER_URL = isProduction ? 'https://sp-az.duckdns.org' : 'http://localhost:3000';
const API_URL = isProduction ? SERVER_URL + '/task-app/api' : SERVER_URL + '/api';

export const API = axios.create({
    baseURL: API_URL
})

// Endpoints config
export const APIEndpoints: Endpoints = {
    // Auth routes
    LOGIN: {
        METHOD: 'POST',
        URL: '/auth/login'
    },
    LOGOUT: {
        METHOD: 'POST',
        URL: '/auth/logout'
    },
    SIGNUP: {
        METHOD: 'POST',
        URL: '/auth/signup'
    },
    GET_ME: {
        METHOD: 'GET',
        URL: '/auth/me'
    },

    // Task Routes
    GET_ALL_TASKS: {
        METHOD: 'GET',
        URL: '/tasks'
    },
    GET_TASK_BY_ID: {
        METHOD: 'GET',
        URL: '/tasks/:taskId'
    },
    CREATE_TASK: {
        METHOD: 'POST',
        URL: '/tasks'
    },
    UPDATE_TASK: {
        METHOD: 'PATCH',
        URL: '/tasks/:taskId'
    },
    DELETE_TASK: {
        METHOD: 'DELETE',
        URL: '/tasks/:taskId'
    },
}