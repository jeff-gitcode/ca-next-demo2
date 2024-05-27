import useSWR from "swr";
import { fetcher } from "./fetcher";

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

