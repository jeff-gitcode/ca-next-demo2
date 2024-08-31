import { injectable } from "inversify";

import { ITodoRepository } from "@/app/application/abstract/todos/itodo.repository";
import { Todo } from "@/app/domain/todo";

@injectable()
export class TodoRepository implements ITodoRepository {
    private todos: Todo[] = [];

    async addTodo(todo: Todo): Promise<Todo> {
        this.todos.push(todo);
        return todo;
    }

    async getTodos(): Promise<Todo[]> {
        return this.todos;
    }
}