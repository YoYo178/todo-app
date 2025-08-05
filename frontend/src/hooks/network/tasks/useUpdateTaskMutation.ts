import { useMutationBase } from "../useMutationBase";
import { APIEndpoints } from "../../../config/api.config";
import type { TCreateTaskBody } from "./useCreateTaskMutation";

export const useUpdateTaskMutation = useMutationBase<Partial<TCreateTaskBody>>(APIEndpoints.UPDATE_TASK, "Updating task", true);