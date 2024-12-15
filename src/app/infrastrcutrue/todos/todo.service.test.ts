import 'reflect-metadata';

import fetchMock from 'jest-fetch-mock';

import { TodoService } from './todo.service';
import { Todo } from '@/app/domain/todo';
import { id } from 'inversify';

fetchMock.enableMocks();

const mockTodo: Todo = {
  title: 'title',
  id: '1',
};

describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(() => {
    fetchMock.resetMocks();
    todoService = new TodoService();
  });

  test('when getTodos should return', async () => {
    // Act
    fetchMock.mockResponseOnce(
      JSON.stringify({
        items: [mockTodo],
      }),
    );
    const result = await todoService.getTodos();

    // Assert
    expect(result).toStrictEqual([mockTodo]);
  });

  test('when createTodo should return', async () => {
    // Act
    fetchMock.mockResponseOnce(JSON.stringify(mockTodo));
    const result = await todoService.createTodo({
      title: 'title',
    });

    // Assert
    expect(result).toEqual(mockTodo);
  });

  test('when getTodo should return', async () => {
    // Act
    fetchMock.mockResponseOnce(JSON.stringify(mockTodo));
    const result = await todoService.getTodo('1');

    // Assert
    expect(result).toEqual(mockTodo);
  });

  test('when updateTodo should return', async () => {
    // Act
    // const request: RequestInit = {
    //   cache: 'no-cache',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'PATCH',
    //   body: JSON.stringify({
    //     title: 'title',
    //   }),
    // };

    const request = {
      requestBody: {
        id: '1',
        title: 'title',
      },
      queryParams: { id: '1' },
    } as any;

    fetchMock.mockResponseOnce(JSON.stringify(mockTodo));
    const result = await todoService.updateTodo('1', request);

    // Assert
    expect(result).toEqual(mockTodo);
  });

  test('when deleteTodo should return', async () => {
    // Act
    fetchMock.mockResponseOnce(JSON.stringify('1'));
    const result = await todoService.deleteTodo('1');

    // Assert
    expect(result).toEqual('1');
  });
});
