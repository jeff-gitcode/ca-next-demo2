import { Container, interfaces } from "inversify";
import React, { useContext } from "react";
import { TodoListUseCase, TodoUseCase, CreateTodoUseCase, UpdateTodoUseCase, DeleteTodoUseCase } from "./use.todo.controller";

export type ApplicationContextType = {
    container: Container | null;
    todoListUseCase: TodoListUseCase;
    todoUseCase: TodoUseCase;
    createTodoUseCase: CreateTodoUseCase;
    updateTodoUseCase: UpdateTodoUseCase;
    deleteTodoUseCase: DeleteTodoUseCase;
};

const ApplicationContext = React.createContext<ApplicationContextType>(
    {
        container: null,
        todoListUseCase: () => ({ data: [], isLoading: false, error: undefined }),
        todoUseCase: (id: string) => ({ data: undefined, isLoading: false, error: undefined }),
        createTodoUseCase: () => ({ createData: undefined, createTodo: undefined, isCreating: false }),
        updateTodoUseCase: () => ({ updateData: undefined, updateTodo: undefined, isUpdating: false }),
        deleteTodoUseCase: () => ({ deleteData: undefined, deleteTodo: undefined, isDeleting: false }),
    });

export const useAppContext = () => useContext(ApplicationContext);

export default ApplicationContext;