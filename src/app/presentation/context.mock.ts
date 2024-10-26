import * as ApplicationContext from "@/app/application/hooks/app.context";

const contextValues = {
    container: null,
    todoListUseCase: jest.fn(),
    todoUseCase: jest.fn(),
    createTodoUseCase: jest.fn(),
    updateTodoUseCase: jest.fn(),
    deleteTodoUseCase: jest.fn(),
};

jest.spyOn(ApplicationContext, "useAppContext").mockImplementation(() => contextValues);
