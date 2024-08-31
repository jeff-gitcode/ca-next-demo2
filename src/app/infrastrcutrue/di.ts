import { ContainerModule } from "inversify";

import { TodoRepository } from "./todos/todo.repository";
import { ITodoRepository } from "../application/abstract/todos/itodo.repository";
import { TYPES } from "../application/di";

export const infrastrcutrueModule = new ContainerModule((bind) => {
    bind<ITodoRepository>(TYPES.TodoRepository).to(TodoRepository);
});
