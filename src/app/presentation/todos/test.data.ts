import { ApplicationContainer } from '@/app/di';
import { fn } from '@storybook/test';

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
    updateTodo: fn(),
    isUpdating: false,
  }),
  createTodoUseCase: () => ({
    createData: null,
    createTodo: fn(),
    isCreating: false,
  }),
  deleteTodoUseCase: () => ({
    deleteData: null,
    deleteTodo: fn(),
    isDeleting: false,
  }),
};
