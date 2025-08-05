import { useMutationBase } from "../useMutationBase";
import { APIEndpoints } from "../../../config/api.config";

export interface TLoginBody {
    email: string;
    password: string;
}

export const useLoginMutation = useMutationBase<TLoginBody>(APIEndpoints.LOGIN, "Login", true);