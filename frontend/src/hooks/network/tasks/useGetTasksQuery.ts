import { useQueryBase } from '../useQueryBase';
import { APIEndpoints } from '../../../config/api.config';

export const useGetTasksQuery = useQueryBase(APIEndpoints.GET_ALL_TASKS, true, true);