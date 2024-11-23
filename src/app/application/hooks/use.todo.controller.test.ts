import { renderHook } from '@testing-library/react';
import useSWR from 'swr';

import {
  useCreateTodoUseCase,
  useDeleteTodoUseCase,
  useTodoListUseCase,
  useUpdateTodoUseCase,
} from './use.todo.controller';

jest.mock('swr');

describe('useTodoListUseCase', () => {
  test('should return', () => {
    // Arrange
    (useSWR as jest.Mock).mockReturnValue({
      data: [],
      error: undefined,
      isLoading: false,
    });

    // Act
    const { result } = renderHook(() => useTodoListUseCase());

    // Assert
    expect(result.current).toEqual({
      data: [],
      error: undefined,
      isLoading: false,
    });
  });
});

describe('useTodoUseCase', () => {
  test('should return', () => {
    // Arrange
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });

    // Act
    const { result } = renderHook(() => useTodoListUseCase());

    // Assert
    expect(result.current).toEqual({
      data: undefined,
      error: undefined,
      isLoading: false,
    });
  });
});

describe('useUpdateTodoUseCase', () => {
  test('should return', () => {
    // Arrange
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      trigger: Function,
      isMutating: false,
    });

    // Act
    const { result } = renderHook(() => useUpdateTodoUseCase());

    // Assert
    expect(result.current).toEqual({
      updateData: undefined,
      updateTodo: expect.any(Function),
      isUpdating: false,
    });
  });
});

describe('useCreateTodoUseCase', () => {
  test('should return', () => {
    // Arrange
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      trigger: Function,
      isMutating: false,
    });

    // Act
    const { result } = renderHook(() => useCreateTodoUseCase());

    // Assert
    expect(result.current).toEqual({
      createData: undefined,
      createTodo: expect.any(Function),
      isCreating: false,
    });
  });
});

describe('useDeleteTodoUseCase', () => {
  test('should return', () => {
    // Arrange
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      trigger: Function,
      isMutating: false,
    });

    // Act
    const { result } = renderHook(() => useDeleteTodoUseCase());

    // Assert
    expect(result.current).toEqual({
      deleteData: undefined,
      deleteTodo: expect.any(Function),
      isDeleting: false,
    });
  });
});
