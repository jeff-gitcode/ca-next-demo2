import "reflect-metadata";

import { ContainerModule } from "inversify";

import { ITodoUseCase } from "./abstract/todos/itodo.usecase";
import { TodoUseCase } from "./todos/todo.usecase";

export const TYPES = {
    TodoUseCase: Symbol.for("TodoUseCase"),
    TodoRepository: Symbol.for("TodoRepository"),
};

export const applicationModule = new ContainerModule((bind) => {
    bind<ITodoUseCase>(TYPES.TodoUseCase).to(TodoUseCase);
});

