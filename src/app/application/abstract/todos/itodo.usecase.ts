import { CreateTodoDto } from "../../dtos/todos/create-todo.input";

export abstract class ITodoUseCase {
    abstract AddTodo(createTodo: CreateTodoDto): Promise<CreateTodoDto>;
}