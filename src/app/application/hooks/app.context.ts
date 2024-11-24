import { Container, interfaces } from 'inversify';
import React, { useContext } from 'react';
import {
  TodoListUseCase,
  TodoUseCase,
  CreateTodoUseCase,
  UpdateTodoUseCase,
  DeleteTodoUseCase,
} from './use.todo.controller';

export type ApplicationContextType = {
  container: Container | null;
  todoListUseCase: TodoListUseCase;
  todoUseCase: TodoUseCase;
  createTodoUseCase: CreateTodoUseCase;
  updateTodoUseCase: UpdateTodoUseCase;
  deleteTodoUseCase: DeleteTodoUseCase;
};

const ApplicationContext = React.createContext<ApplicationContextType>({
  container: null,
  todoListUseCase: () => ({ data: [], isLoading: false, error: '' }),
  todoUseCase: (id: string) => ({
    data: { id: '', title: '' },
    isLoading: false,
    error: '',
  }),
  createTodoUseCase: () => ({
    createData: undefined,
    createTodo: undefined,
    isCreating: false,
  }),
  updateTodoUseCase: () => ({
    updateData: {
      id: '',
      title: '',
    },
    updateTodo: undefined,
    isUpdating: false,
  }),
  deleteTodoUseCase: () => ({
    deleteData: undefined,
    deleteTodo: undefined,
    isDeleting: false,
  }),
});

export const useAppContext = () => useContext(ApplicationContext);

export default ApplicationContext;
