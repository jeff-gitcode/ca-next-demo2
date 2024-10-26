import { render, screen } from "@testing-library/react";
import React from "react";

import TodoPage from "./page";
import * as UseTodoController from "@/app/application/hooks/use.todo.controller";
// import * as ApplicationContext from "@/app/application/hooks/app.context";



describe("TodoPage", () => {
    test("should render", () => {
        // Arrange
        // const mockTodoListUseCase = jest.fn();
        // const mockDeleteTodoUseCase = jest.fn();

        const data = [
            {
                id: "1",
                title: "title",
                description: "description",
                status: "status",
                created_at: "created_at",
                updated_at: "updated_at",
            },
        ];
        const isLoading = false;
        const error = undefined;
        const deleteData = undefined;
        const deleteTodo = jest.fn();
        const isDeleting = false;
        // const contextValues = {
        //     container: null,
        //     todoListUseCase: mockTodoListUseCase,
        //     todoUseCase: jest.fn(),
        //     createTodoUseCase: jest.fn(),
        //     updateTodoUseCase: jest.fn(),
        //     deleteTodoUseCase: mockDeleteTodoUseCase,
        // };

        // jest.mock("@/app/application/hooks/app.context");
        // const useContextSpy = jest.spyOn(ApplicationContext, "useAppContext").mockImplementation(() => contextValues);

        // const todoListUseCaseSpy = jest.spyOn(UseTodoController, "useTodoListUseCase").mockReturnValue({
        //     data,
        //     isLoading,
        //     error,
        // });
        jest.mock("@/app/application/hooks/use.todo.controller", () => ({
            useTodoListUseCase: jest.fn().mockReturnValue({ data, isLoading, error }),
            useDeleteTodoUseCase: jest.fn().mockReturnValue({ deleteData, deleteTodo, isDeleting }),
        }));

        // const deleteTodoUseCaseSpy = jest.spyOn(UseTodoController, "useDeleteTodoUseCase").mockReturnValue({
        //     deleteData,
        //     deleteTodo,
        //     isDeleting,
        // });
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
        render(<TodoPage />);
        screen.debug();
        // Act
        // Assert
        // expect(screen).toMatchSnapshot();
        // expect(useContextSpy).toHaveBeenCalled();
        // expect(todoListUseCaseSpy).toHaveBeenCalled();
        // expect(deleteTodoUseCaseSpy).toHaveBeenCalled();
        // expect(consoleSpy).toHaveBeenCalledWith(data);
    });


    // xtest("should render loading", () => {
    //     // Arrange
    //     const todoListUseCase = jest.fn();
    //     const deleteTodoUseCase = jest.fn();
    //     const data = undefined;
    //     const isLoading = true;
    //     const error = undefined;
    //     const deleteData = undefined;
    //     const deleteTodo = jest.fn();
    //     const isDeleting = false;
    //     const useContextSpy = jest.spyOn(React, "useContext").mockReturnValue({
    //         todoListUseCase,
    //         deleteTodoUseCase,
    //     });
    //     const todoListUseCaseSpy = jest.spyOn(useTodoController, "useTodoListUseCase").mockReturnValue({
    //         data,
    //         isLoading,
    //         error,
    //     });
    //     const deleteTodoUseCaseSpy = jest.spyOn(useTodoController, "useDeleteTodoUseCase").mockReturnValue({
    //         deleteData,
    //         deleteTodo,
    //         isDeleting,
    //     });
    //     const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    //     const wrapper = render(<TodoPage />);
    //     // Act
    //     // Assert
    //     expect(wrapper).toMatchSnapshot();
    //     expect(useContextSpy).toHaveBeenCalled();
    //     expect(todoListUseCaseSpy).toHaveBeenCalled();
    //     expect(deleteTodoUseCaseSpy).toHaveBeenCalled();
    //     expect(consoleSpy).not.toHaveBeenCalled();
    // }
    // );

    // xtest("should render error", () => {
    //     // Arrange
    //     const todoListUseCase = jest.fn();
    //     const deleteTodoUseCase = jest.fn();
    //     const data = undefined;
    //     const isLoading = false;
    //     const error = "error";
    //     const deleteData = undefined;
    //     const deleteTodo = jest.fn();
    //     const isDeleting = false;
    //     const useContextSpy = jest.spyOn(React, "useContext").mockReturnValue({
    //         todoListUseCase,
    //         deleteTodoUseCase,
    //     });
    //     const todoListUseCaseSpy = jest.spyOn(useTodoController, "useTodoListUseCase").mockReturnValue({
    //         data,
    //         isLoading,
    //         error,
    //     });
    //     const deleteTodoUseCaseSpy = jest.spyOn(useTodoController, "useDeleteTodoUseCase").mockReturnValue({
    //         deleteData,
    //         deleteTodo,
    //         isDeleting,
    //     });
    //     const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    //     const wrapper = render(<TodoPage />);
    //     // Act
    //     // Assert
    //     expect(wrapper).toMatchSnapshot();
    //     expect(useContextSpy).toHaveBeenCalled();
    //     expect(todoListUseCaseSpy).toHaveBeenCalled();
    //     expect(deleteTodoUseCaseSpy).toHaveBeenCalled();
    //     expect(consoleSpy).not.toHaveBeenCalled();
    // });

    // xtest("should call deleteTodo", () => {
    //     // Arrange
    //     const todoListUseCase = jest.fn();
    //     const deleteTodoUseCase = jest.fn();
    //     const data = [
    //         {
    //             id: "1",
    //             title: "title",
    //             description: "description",
    //             status: "status",
    //             created_at: "created_at",
    //             updated_at: "updated_at",
    //         },
    //     ];
    //     const isLoading = false;
    //     const error = undefined;
    //     const deleteData = undefined;
    //     const deleteTodo = jest.fn();
    //     const isDeleting = false;
    //     const useContextSpy = jest.spyOn(React, "useContext").mockReturnValue({
    //         todoListUseCase,
    //         deleteTodoUseCase,
    //     });
    //     const todoListUseCaseSpy = jest.spyOn(useTodoController, "useTodoListUseCase").mockReturnValue({
    //         data,
    //         isLoading,
    //         error,
    //     });
    //     const deleteTodoUseCaseSpy = jest.spyOn(useTodoController, "useDeleteTodoUseCase").mockReturnValue({
    //         deleteData,
    //         deleteTodo,
    //         isDeleting,
    //     });
    //     const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    //     const wrapper = render(<TodoPage />);
    //     // Act
    //     wrapper.find("button").simulate("click");
    //     // Assert
    //     expect(deleteTodo).toHaveBeenCalled({ queryParams: { id: "1" } });
    // });

    // xtest("should call deleteTodo", () => {
    //     // Arrange
    //     const todoListUseCase = jest.fn();
    //     const deleteTodoUseCase = jest.fn();
    //     const data = [
    //         {
    //             id: "1",
    //             title: "title",
    //             description: "description",
    //             status: "status",
    //             created_at: "created_at",
    //             updated_at: "updated_at",
    //         },
    //     ];
    //     const isLoading = false;
    //     const error = undefined;
    //     const deleteData = undefined;
    //     const deleteTodo = jest.fn();
    //     const isDeleting = false;
    //     const useContextSpy = jest.spyOn(React, "useContext").mockReturnValue({
    //         todoListUseCase,
    //         deleteTodoUseCase,
    //     });
    //     const todoListUseCaseSpy = jest.spyOn(useTodoController, "useTodoListUseCase").mockReturnValue({
    //         data,
    //         isLoading,
    //         error,
    //     });
    //     const deleteTodoUseCaseSpy = jest.spyOn(useTodoController, "useDeleteTodoUseCase").mockReturnValue({
    //         deleteData,
    //         deleteTodo,
    //         isDeleting,
    //     });
    //     const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    //     const wrapper = render(<TodoPage />);
    //     // Act
    //     wrapper.find("button").simulate("click");
    //     // Assert
    //     expect(deleteTodo).toHaveBeenCalledWith({ queryParams: { id: "1" } });
    // });
}
);
