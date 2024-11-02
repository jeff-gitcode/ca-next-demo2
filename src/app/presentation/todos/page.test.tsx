import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { debug } from 'jest-preview';
import React from "react";
import { useRouter } from "next/router";

import TodoPage from "./page";
import * as UseTodoController from "@/app/application/hooks/use.todo.controller";
import * as ApplicationContext from "@/app/application/hooks/app.context";
import { TodoListUseCase } from '@/app/application/hooks/use.todo.controller';
import { ApplicationProviderMock, nextRender } from '../setupJest';

jest.mock("@/app/application/hooks/app.context", () => {
    const original: typeof ApplicationContext = jest.requireActual("@/app/application/hooks/app.context");

    return ({
        ...original,
        useAppContext: jest.fn(),
    });
});
const mockUseAppContext = ApplicationContext.useAppContext as jest.Mock;

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}))

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

        expect(screen.getByRole('link', { name: 'Create' })).toHaveAttribute('href', '/presentation/todos/new');
        expect(screen.getByRole('link', { name: 'Edit' })).toHaveAttribute('href', '/presentation/todos/1');
        expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();

        expect(mockTodoListUseCase).toHaveBeenCalledTimes(1);
        expect(mockDeleteTodoUseCase).toHaveBeenCalledTimes(1);

        // Act
        const createButton = screen.getByRole('link', { name: 'Create' });
        expect(createButton.getAttribute('href')).toBe('/presentation/todos/new');
        expect(createButton).toHaveAttribute('href', '/presentation/todos/new');

        fireEvent.click(createButton);
        // expect(window.location.pathname).toBe('/presentation/todos/new');

        const editButton = screen.getByRole('link', { name: 'Edit' });

        fireEvent.click(editButton);

        const deleteButton = screen.getByRole('button', { name: 'Delete' });
        fireEvent.click(deleteButton);

        // Assert
        expect(deleteTodo).toHaveBeenCalledWith({ queryParams: { id: "1" } });
        screen.debug();
    });
});
