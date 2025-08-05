import { useMutationBase } from "../useMutationBase";
import { APIEndpoints } from "../../../config/api.config";

export interface TCreateTaskBody {
    title: string;
    description?: string;
    rating?: number;
}

export const useCreateTaskMutation = useMutationBase<TCreateTaskBody>(APIEndpoints.CREATE_TASK, "Creating task", true);