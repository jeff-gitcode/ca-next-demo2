import "reflect-metadata";

import { ContainerModule } from "inversify";

import { ITodoUseCase } from "./abstract/todos/itodo.usecase";
import { TodoUseCase } from "./todos/todo.usecase";
import { TYPES } from "../types";

export const applicationModule = new ContainerModule((bind) => {
    bind<ITodoUseCase>(TYPES.TodoUseCase).to(TodoUseCase);
});

