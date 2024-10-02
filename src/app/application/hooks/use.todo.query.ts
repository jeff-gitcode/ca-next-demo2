import useSWR, { mutate } from "swr";
import { deleteRequest, fetcher, patchRequest, postRequest } from "../../infrastrcutrue/todos/fetcher";
import useSWRMutation from "swr/mutation";

export function useTodoQuery() {
    const { data, error, isLoading } = useSWR(`/api/todos`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}