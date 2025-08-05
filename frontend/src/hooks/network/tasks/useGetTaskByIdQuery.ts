import { useQueryBase } from '../useQueryBase';
import { APIEndpoints } from '../../../config/api.config';

export const useGetTaskByIdQuery = useQueryBase(APIEndpoints.GET_TASK_BY_ID, true, true);