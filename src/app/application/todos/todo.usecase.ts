import { inject, injectable } from "inversify";

import { CreateTodoDto } from "../dtos/todos/create-todo.input";
import { Todo } from "../../domain/todo";
import { ITodoUseCase } from "../abstract/todos/itodo.usecase";
import { TYPES } from "../di";
import { ITodoRepository } from "../abstract/todos/itodo.repository";

@injectable()
export class TodoUseCase implements ITodoUseCase {
    constructor(
        @inject(TYPES.TodoRepository) private readonly todoRepository: ITodoRepository
    ) {

    }

    async AddTodo(createTodo: CreateTodoDto): Promise<CreateTodoDto> {
        const todo: Todo = {
            title: createTodo.title,
            id: ""
        }

        await this.todoRepository.addTodo(todo);
        return createTodo;
    }
}