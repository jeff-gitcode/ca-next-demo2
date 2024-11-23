import useSWR, { mutate } from 'swr';
import {
  deleteRequest,
  fetcher,
  patchRequest,
  postRequest,
} from '../../infrastrcutrue/todos/fetcher';
import useSWRMutation from 'swr/mutation';
import { useState, useEffect, use } from 'react';

export type TodoListUseCase = () => {
  data: any[];
  isLoading: boolean;
  error: undefined;
};

export type TodoUseCase = (id: string) => {
  data: undefined;
  isLoading: boolean;
  error: undefined;
};

export type UpdateTodoUseCase = () => {
  updateData: any;
  updateTodo: any;
  isUpdating: boolean;
};

export type CreateTodoUseCase = () => {
  createData: any;
  createTodo: any;
  isCreating: boolean;
};

export type DeleteTodoUseCase = () => {
  deleteData: any;
  deleteTodo: any;
  isDeleting: boolean;
};

export const useTodoListUseCase: TodoListUseCase = () => {
  const { data, error, isLoading } = useSWR(`/api/todos`, fetcher);

  return {
    data,
    isLoading,
    error,
  };
};

export const useTodoUseCase: TodoUseCase = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/todos/${id}`, fetcher);

  return {
    data,
    isLoading,
    error,
  };
};

export const useUpdateTodoUseCase: UpdateTodoUseCase = () => {
  const {
    data: updateData,
    trigger: updateTodo,
    isMutating: isUpdating,
  } = useSWRMutation('/api/todos', patchRequest);

  return {
    updateData,
    updateTodo,
    isUpdating,
  };
};

export const useCreateTodoUseCase: CreateTodoUseCase = () => {
  const {
    data: createData,
    trigger: createTodo,
    isMutating: isCreating,
  } = useSWRMutation('/api/todos', postRequest);

  return {
    createData,
    createTodo,
    isCreating,
  };
};

export const useDeleteTodoUseCase: DeleteTodoUseCase = () => {
  const {
    data: deleteData,
    trigger: deleteTodo,
    isMutating: isDeleting,
  } = useSWRMutation('/api/todos', deleteRequest);

  return {
    deleteData,
    deleteTodo,
    isDeleting,
  };
};
