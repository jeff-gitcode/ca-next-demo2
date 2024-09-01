import { inject, injectable } from "inversify";

import { CreateTodoDto } from "../dtos/todos/create-todo.input";
import { Todo } from "../../domain/todo";
import { ITodoUseCase } from "../abstract/todos/itodo.usecase";
import { ITodoRepository } from "../abstract/todos/itodo.repository";
import { TYPES } from "@/app/types";

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