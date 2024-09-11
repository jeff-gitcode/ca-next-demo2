import "reflect-metadata";

import { inject, injectable } from "inversify";

import { ITodoRepository } from "@/app/application/abstract/todos/itodo.repository";
import { Todo } from "@/app/domain/todo";
import { todo } from "node:test";
import { TYPES } from "@/app/types";
import { ITodoService } from "./todo.service";

@injectable()
export class TodoRepository implements ITodoRepository {
    constructor(
        @inject(TYPES.TodoService) private readonly todoService: ITodoService
    ) {
    }

    async addTodo(todo: Todo): Promise<Todo> {
        return this.todoService.createTodo(todo);
    }

    async getTodos(): Promise<Todo[]> {
        return this.todoService.getTodos();
    }

    async getTodoById(id: string): Promise<Todo> {
        return this.todoService.getTodo(id);
    }

    async updateTodoById(id: string, todo: Request): Promise<Todo> {
        return this.todoService.updateTodo(id, todo);
    }

    async deleteTodoById(id: string): Promise<string> {
        return this.todoService.deleteTodo(id);
    }
}