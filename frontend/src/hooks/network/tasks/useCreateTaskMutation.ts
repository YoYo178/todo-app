import { useMutationBase } from "../useMutationBase";
import { APIEndpoints } from "../../../config/api.config";

export interface TCreateTaskBody {
    name: string;
    email: string;
    password: string;
}

export const useCreateTaskMutation = useMutationBase<TCreateTaskBody>(APIEndpoints.CREATE_TASK, "Creating task");