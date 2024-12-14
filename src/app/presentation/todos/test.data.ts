import { ApplicationContainer } from '@/app/di';
import { fn } from '@storybook/test';

export const mockDeleteTodo = fn();
export const mockCreateTodo = fn();
export const mockUpdateTodo = fn();

export const testData = {
  container: ApplicationContainer,
  todoListUseCase: () => ({
    data: [
      {
        id: '1',
        title: 'test title1',
      },
      {
        id: '2',
        title: 'test title2',
      },
    ],
    isLoading: false,
    error: '',
  }),
  todoUseCase: (id: string) => ({
    data: { id: id, title: 'test title' },
    isLoading: false,
    error: '',
  }),
  updateTodoUseCase: () => ({
    updateData: null,
    updateTodo: () => {
      console.log('updateTodo');
      mockUpdateTodo();
    },
    isUpdating: false,
  }),
  createTodoUseCase: () => ({
    createData: null,
    createTodo: () => {
      console.log('createTodo');
      mockCreateTodo();
    },
    isCreating: false,
  }),
  deleteTodoUseCase: () => ({
    deleteData: null,
    deleteTodo: () => {
      console.log('deleteTodo');
      mockDeleteTodo();
    },
    isDeleting: false,
  }),
};
