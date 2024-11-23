import 'reflect-metadata';

import { ITodoRepository } from '../abstract/todos/itodo.repository';
import { TodoUseCase } from './todo.usecase';
import { Todo } from '@/app/domain/todo';

const mockTodo: Todo = {
  title: 'title',
  id: '1',
};

describe('todo.usecase', () => {
  let todoUseCase: TodoUseCase;
  let todoRepository: ITodoRepository;

  beforeEach(() => {
    todoRepository = {
      addTodo: jest.fn().mockReturnValue(Promise.resolve(mockTodo)),
      deleteTodoById: jest.fn().mockReturnValue(Promise.resolve('1')),
      getTodoById: jest.fn().mockReturnValue(Promise.resolve(mockTodo)),
      getTodos: jest.fn().mockReturnValue(Promise.resolve([mockTodo])),
      updateTodoById: jest.fn().mockReturnValue(Promise.resolve(mockTodo)),
    } as any;

    todoUseCase = new TodoUseCase(todoRepository);
  });

  test('when createTodo should return', async () => {
    // Arrange
    const createTodo = {
      title: 'title',
    } as any;

    // Act
    const result = await todoUseCase.AddTodo(createTodo);

    // Assert
    expect(result).toEqual(mockTodo);
    expect(todoRepository.addTodo).toHaveBeenCalledWith({
      title: 'title',
      id: '',
    });
  });

  test('when getTodos should return', async () => {
    // Act
    const result = await todoUseCase.GetTodos();

    // Assert
    expect(result).toEqual([mockTodo]);
    expect(todoRepository.getTodos).toHaveBeenCalled();
  });

  test('when getTodoById should return', async () => {
    // Act
    const result = await todoUseCase.GetTodoById('1');

    // Assert
    expect(result).toEqual(mockTodo);
    expect(todoRepository.getTodoById).toHaveBeenCalledWith('1');
  });

  test('when updateTodoById should return', async () => {
    // Arrange
    const request = {
      title: 'title',
    } as any;

    // Act
    const result = await todoUseCase.UpdateTodoById('1', request);

    // Assert
    expect(result).toEqual(mockTodo);
    expect(todoRepository.updateTodoById).toHaveBeenCalledWith('1', request);
  });

  test('when deleteTodoById should return', async () => {
    // Act
    const result = await todoUseCase.DeleteTodoById('1');

    // Assert
    expect(result).toEqual('1');
    expect(todoRepository.deleteTodoById).toHaveBeenCalledWith('1');
  });
});
