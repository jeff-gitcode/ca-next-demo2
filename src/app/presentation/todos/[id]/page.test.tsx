import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { TodoUseCase } from "@/app/application/hooks/use.todo.controller";
import userEvent from "@testing-library/user-event";

import TodoPage from "./page.t1";
import * as ApplicationContext from "@/app/application/hooks/app.context";
import { act } from "react";

jest.mock("@/app/application/hooks/app.context", () => {
    const original: typeof ApplicationContext = jest.requireActual("@/app/application/hooks/app.context");

    return ({
        ...original,
        useAppContext: jest.fn(),
    });
});
const mockUseAppContext = ApplicationContext.useAppContext as jest.Mock;

function setup(ui: React.ReactNode) {
    return {
        user: userEvent.setup(),
        ...render(ui),
    };
}

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
        screen.debug();

        expect(screen.getByPlaceholderText('ID')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });

    test("should render loading", () => {
        // Arrange
        const data = undefined;
        const isLoading = true;
        const error = undefined;
        const updateData = undefined;

        mockTodoUseCase.mockReturnValue({ data, isLoading, error });
        mockUpdateTodoUseCase.mockReturnValue({ updateData });

        // Act
        render(<TodoPage params={{ id: "1" }} />);

        // Assert
        expect(screen.getByText('loading...')).toBeInTheDocument();
    });

    test("should render error", () => {
        // Arrange
        const data = undefined;
        const isLoading = false;
        const error = new Error("test error");
        const updateData = undefined;

        mockTodoUseCase.mockReturnValue({ data, isLoading, error });
        mockUpdateTodoUseCase.mockReturnValue({ updateData });

        // Act
        render(<TodoPage params={{ id: "1" }} />);

        // Assert
        expect(screen.getByText('failed to load')).toBeInTheDocument();
    });

    test("should update todo", async () => {
        // Arrange
        const data = {
            id: "1",
            title: "test title",
            description: "test description",
            status: "test status",
            created_at: "test created_at",
            updated_at: "test updated_at",
        };

        const isLoading = false;
        const error = undefined;
        const updateData = undefined;
        const updateTodo = jest.fn();
        const isUpdating = false;

        mockTodoUseCase.mockReturnValue({ data, isLoading, error });
        mockUpdateTodoUseCase.mockReturnValue({ updateData, updateTodo, isUpdating });

        // Act
        const { user } = setup(<TodoPage params={{ id: "1" }} />);
        // render(<TodoPage params={{ id: "1" }} />);
        await user.type(screen.getByPlaceholderText('Title'), 'updated title');
        screen.debug();

        // Assert
        const confirmButton = screen.getByRole('button', { name: 'Confirm' });

        /// await user.click(confirmButton);
        await act(async () => {
            fireEvent.keyPress(confirmButton);
        });
        // fireEvent.click(confirmButton);
        // console.log(confirmButton);
        console.log(prettyDOM(confirmButton));
        // fireEvent.click(confirmButton);

        // expect(updateTodo).toHaveBeenCalledTimes(1);
        // expect(mockUpdateTodoUseCase).toHaveBeenCalledTimes(1);

    });
});

