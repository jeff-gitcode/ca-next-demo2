import useSWR, { mutate } from "swr";
import { deleteRequest, fetcher, patchRequest, postRequest } from "../../infrastrcutrue/todos/fetcher";
import useSWRMutation from "swr/mutation";
import { useState, useEffect, use } from "react";

export interface TodoListUseCase {
    data: any;
    isLoading: boolean;
    error: any;
}

export function useTodoListController(): TodoListUseCase {
    const { data, error, isLoading } = useSWR(`/api/todos`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}

export function useTodoController(id: string) {
    const { data, error, isLoading } = useSWR(`/api/todos/${id}`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}

export function useUpdateTodoController() {
    const { data: updateData, trigger: updateTodo, isMutating: isUpdating } = useSWRMutation('/api/todos', patchRequest);

    return {
        updateData,
        updateTodo,
        isUpdating,
    }
}

export function useCreateTodoController() {
    const { data: createData, trigger: createTodo, isMutating: isCreating } = useSWRMutation('/api/todos', postRequest);

    return {
        createData,
        createTodo,
        isCreating,
    }
}

export function useDeleteTodoController() {
    const { data: deleteData, trigger: deleteTodo, isMutating: isDeleting } = useSWRMutation('/api/todos', deleteRequest);

    return {
        deleteData,
        deleteTodo,
        isDeleting,
    }
}
