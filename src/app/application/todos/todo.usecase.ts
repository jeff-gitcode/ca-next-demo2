import { inject, injectable } from "inversify";

import { TodoDto } from "../dtos/todos/create-todo.input";
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

    async AddTodo(createTodo: TodoDto): Promise<TodoDto> {
        const todo: Todo = {
            title: createTodo.title,
            id: ""
        }

        await this.todoRepository.addTodo(todo);
        return createTodo;
    }

    async GetTodos(): Promise<TodoDto[]> {
        const todos = await this.todoRepository.getTodos();
        return todos.map(todo => {
            return {
                id: todo.id,
                title: todo.title
            }
        });
    }

    async GetTodoById(id: string): Promise<TodoDto> {
        const todo = await this.todoRepository.getTodoById(id);
        return {
            id: todo.id,
            title: todo.title
        }
    }

    async UpdateTodoById(id: string, todo: Request): Promise<TodoDto> {
        const updatedTodo = await this.todoRepository.updateTodoById(id, todo);
        return {
            id: updatedTodo.id,
            title: updatedTodo.title
        }
    }

    async DeleteTodoById(id: string): Promise<string> {
        return this.todoRepository.deleteTodoById(id);
    }
}