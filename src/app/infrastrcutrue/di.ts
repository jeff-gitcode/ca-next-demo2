import { ContainerModule } from "inversify";

import { TodoRepository } from "./todos/todo.repository";
import { ITodoRepository } from "../application/abstract/todos/itodo.repository";
import { ITodoService, TodoService } from "./todos/todo.service";
import { TYPES } from "../types";

export const infrastructrueModule = new ContainerModule((bind) => {
    bind<ITodoService>(TYPES.TodoService).to(TodoService);
    bind<ITodoRepository>(TYPES.TodoRepository).to(TodoRepository);
});
