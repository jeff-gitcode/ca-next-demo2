import { fireEvent, render, screen } from "@testing-library/react";
import { mockUseAppContext } from "@/app/application/hooks/app.context";
import { TodoUseCase } from "@/app/application/hooks/use.todo.controller";

import TodoPage from "./page";

describe("TodoPage", () => {
    let mockTodoUseCase: jest.Mock;
    let mockUpdateTodoUseCase: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        mockTodoUseCase = jest.fn();
        mockUpdateTodoUseCase = jest.fn();

        const contextValues = {
            todoUseCase: mockTodoUseCase,
            updateTodoUseCase: mockUpdateTodoUseCase,
        };

        mockUseAppContext.mockReturnValue(contextValues);
    });

    test("should render", () => {
        // Arrange
        const data = {
            id: "1",
            title: "test title",
            description: "test description",
            status: "test status",
            created_at: "test created_at",
            updated_at: "test updated_at",
        };

        const isLoading = true;
        const error = undefined;
        const updateData = undefined;

        mockTodoUseCase.mockReturnValue({ data, isLoading, error });
        mockUpdateTodoUseCase.mockReturnValue({ updateData });

        // Act
        const { container } = render(<TodoPage params={{ id: "1" }} />);

        // Assert
        expect(container).toMatchSnapshot();
    });
});

