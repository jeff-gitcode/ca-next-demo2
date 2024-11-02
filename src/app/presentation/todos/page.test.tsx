import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { debug } from 'jest-preview';
import React from "react";

import TodoPage from "./page";
import * as UseTodoController from "@/app/application/hooks/use.todo.controller";
import * as ApplicationContext from "@/app/application/hooks/app.context";
import { TodoListUseCase } from '@/app/application/hooks/use.todo.controller';

jest.mock("@/app/application/hooks/app.context", () => {
    const original: typeof ApplicationContext = jest.requireActual("@/app/application/hooks/app.context");

    return ({
        ...original,
        useAppContext: jest.fn(),
    });
});
const mockUseAppContext = ApplicationContext.useAppContext as jest.Mock;

describe("TodoPage", () => {
    let mockTodoListUseCase: jest.Mock;
    let mockDeleteTodoUseCase: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        mockTodoListUseCase = jest.fn();
        mockDeleteTodoUseCase = jest.fn();


        const contextValues = {
            todoListUseCase: mockTodoListUseCase,
            deleteTodoUseCase: mockDeleteTodoUseCase,
        };

        mockUseAppContext.mockReturnValue(contextValues);

        // jest.mock("@/app/application/hooks/app.context", () => {
        //     const original: typeof ApplicationContext = jest.requireActual("@/app/application/hooks/app.context");

        //     return ({
        //         ...original,
        //         useAppContext: () => contextValues
        //     });
        // });


    });

    test("should render", () => {
        // Arrange
        const data =
            [{
                id: "1",
                title: "test title",
                description: "test description",
                status: "test status",
                created_at: "test created_at",
                updated_at: "test updated_at",
            }];

        const isLoading = true;
        const error = undefined;
        const deleteData = undefined;
        const deleteTodo = jest.fn();
        const isDeleting = false;

        mockTodoListUseCase.mockReturnValue({ data, isLoading, error });
        mockDeleteTodoUseCase.mockReturnValue({ deleteData, deleteTodo, isDeleting });

        // Act
        render(<TodoPage />);
        screen.debug();

        // Assert
        expect(screen.getByText("Todos")).toBeInTheDocument();
        expect(screen.getByText("test title")).toBeInTheDocument();
        expect(screen.getByText("Create")).toBeInTheDocument();
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
    });
});
