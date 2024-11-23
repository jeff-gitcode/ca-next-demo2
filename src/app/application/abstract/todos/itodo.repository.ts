import { Todo } from '@/app/domain/todo';

export abstract class ITodoRepository {
  abstract addTodo(todo: Todo): Promise<Todo>;
  abstract getTodos(): Promise<Todo[]>;
  abstract getTodoById(id: string): Promise<Todo>;
  abstract updateTodoById(id: string, todo: Request): Promise<Todo>;
  abstract deleteTodoById(id: string): Promise<string>;
}
