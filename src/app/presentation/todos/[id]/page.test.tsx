import { fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { TodoUseCase } from "@/app/application/hooks/use.todo.controller";
import userEvent from "@testing-library/user-event";

import { FormValue, todoSchema } from "@/app/application/validator/todo";
import { useRouter } from "next/navigation";
import * as ApplicationContext from "@/app/application/hooks/app.context";
import { act } from "react";
import TodoPage from "./page";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            query: {
                id: "1",
            },
            push: mockPush,
        };
    },
}));

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
        jest.setTimeout(10000);
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
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();

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
        const mockUpdateTodo = jest.fn();
        const updateTodo = mockUpdateTodo;
        const isUpdating = false;

        mockTodoUseCase.mockReturnValue({ data, isLoading, error });
        mockUpdateTodoUseCase.mockReturnValue({ updateData, updateTodo, isUpdating });

        // Act
        // const { user } = setup(<TodoPage params={{ id: "1" }} />);
        render(<TodoPage params={{ id: "1" }} />);
        const title = screen.getByPlaceholderText('Title');
        await fireEvent.input(title, { target: { value: 'updated title' } });
        screen.debug();

        // Assert
        const confirmButton = screen.getByTestId('submit');
        await waitFor(() => {
            fireEvent.click(confirmButton);
            // console.log(confirmButton);
            console.log(prettyDOM(confirmButton));
        });

        // await waitFor(() => {
        expect(mockUpdateTodo).toHaveBeenCalledWith({ requestBody: { id: "1", title: "updated title" }, queryParams: { id: "1" } });
        expect(mockPush).toHaveBeenCalledWith(`/presentation/todos`);
        // });
    }, 30000);
});

