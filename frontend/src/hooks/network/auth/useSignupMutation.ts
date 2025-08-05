import { useMutationBase } from "../useMutationBase";
import { APIEndpoints } from "../../../config/api.config";

export interface TSignupBody {
    name: string;
    email: string;
    password: string;
}

export const useSignupMutation = useMutationBase<TSignupBody>(APIEndpoints.SIGNUP, "Sign up");