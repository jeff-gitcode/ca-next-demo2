import { Todo } from "@/app/domain/todo";

export abstract class ITodoRepository {
  abstract addTodo(todo: Todo): Promise<Todo>;
  abstract getTodos(): Promise<Todo[]>;
}