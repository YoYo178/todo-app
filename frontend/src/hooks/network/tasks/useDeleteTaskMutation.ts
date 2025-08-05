import { useMutationBase } from "../useMutationBase";
import { APIEndpoints } from "../../../config/api.config";

export const useDeleteTaskMutation = useMutationBase(APIEndpoints.DELETE_TASK, "Deleting task");