import { TodoDto } from "../../dtos/todos/create-todo.input";

export abstract class ITodoUseCase {
    abstract AddTodo(createTodo: TodoDto): Promise<TodoDto>;
    abstract GetTodos(): Promise<TodoDto[]>;
    abstract GetTodoById(id: string): Promise<TodoDto>;
    abstract UpdateTodoById(id: string, todo: Request): Promise<TodoDto>;
    abstract DeleteTodoById(id: string): Promise<string>;
}