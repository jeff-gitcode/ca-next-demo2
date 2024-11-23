import { TodoDto } from '../../dtos/todos/create-todo.input';

export abstract class ITodoFEUseCase {
  abstract AddTodo(): Promise<TodoDto>;
  abstract GetTodos(): Promise<TodoDto[]>;
  abstract GetTodoById(): Promise<TodoDto>;
  abstract UpdateTodoById(): Promise<TodoDto>;
  abstract DeleteTodoById(): Promise<string>;
}
