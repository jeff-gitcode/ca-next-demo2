import { inject, injectable } from 'inversify';

import { TodoDto } from '../dtos/todos/create-todo.input';
import { ITodoFEUseCase } from '../abstract/todos/itodofe.usecase';

@injectable()
export class TodoFEUseCase implements ITodoFEUseCase {
  constructor() {}
  GetTodos(): Promise<TodoDto[]> {
    throw new Error('Method not implemented.');
  }
  GetTodoById(): Promise<TodoDto> {
    throw new Error('Method not implemented.');
  }
  UpdateTodoById(): Promise<TodoDto> {
    throw new Error('Method not implemented.');
  }
  DeleteTodoById(): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async AddTodo(): Promise<TodoDto> {
    throw new Error('Method not implemented.');
  }
}
