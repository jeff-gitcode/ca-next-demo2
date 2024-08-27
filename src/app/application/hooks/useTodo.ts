import useSWR, { mutate } from "swr";
import { deleteRequest, fetcher, patchRequest, postRequest } from "../fetcher";
import useSWRMutation from "swr/mutation";

export function useTodos() {
    const { data, error, isLoading } = useSWR(`/api/todos`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}

export function useTodo(id: string) {
    const { data, error, isLoading } = useSWR(`/api/todos/${id}`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}

export function useUpdateTodo() {
    const { data: updateData, trigger: updateTodo, isMutating: isUpdating } = useSWRMutation('/api/todos', patchRequest);

    return {
        updateData,
        updateTodo,
        isUpdating,
    }
}

export function useCreateTodo() {
    const { data: createData, trigger: createTodo, isMutating: isCreating } = useSWRMutation('/api/todos', postRequest);

    return {
        createData,
        createTodo,
        isCreating,
    }
}

export function useDeleteTodo() {
    const { data: deleteData, trigger: deleteTodo, isMutating: isDeleting } = useSWRMutation('/api/todos', deleteRequest);

    return {
        deleteData,
        deleteTodo,
        isDeleting,
    }
}
