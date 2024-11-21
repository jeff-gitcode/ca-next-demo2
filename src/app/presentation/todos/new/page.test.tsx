import { fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

import * as ApplicationContext from "@/app/application/hooks/app.context";
import TodoPage from "./page";

jest.mock("@/app/application/hooks/app.context", () => {
    const original: typeof ApplicationContext = jest.requireActual("@/app/application/hooks/app.context");

    return ({
        ...original,
        useAppContext: jest.fn(),
    });
});
const mockUseAppContext = ApplicationContext.useAppContext as jest.Mock;

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

describe("Page", () => {
    let mockCreateTodoUseCase: jest.Mock;

    beforeEach(() => {
        jest.setTimeout(10000);
        jest.clearAllMocks();

        mockCreateTodoUseCase = jest.fn();

        const contextValues = {
            createTodoUseCase: mockCreateTodoUseCase,
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
        const createTodo = undefined;

        mockCreateTodoUseCase.mockReturnValue({ createTodo });

        // Act
        const { container } = render(<TodoPage params={{ id: "1" }} />);
    });

    test("should render loading", () => {
        // Arrange
        const data = undefined;
        const isLoading = true;
        const error = undefined;
        const updateData = undefined;

        mockTodoUseCase.mockReturnValue({ data, isLoading, error });
        mockCreateTodoUseCase.mockReturnValue({ updateData });

        // Act
        const { container } = render(<TodoPage params={{ id: "1" }} />);

        // Assert
        expect(screen.getByText("loading...")).toBeInTheDocument();
    });

    test("should render error", () => {
        // Arrange
        const data = undefined;
        const isLoading = false;
        const error = new Error("error");
        const updateData = undefined;

        mockTodoUseCase.mockReturnValue({ data, isLoading, error });
        mockCreateTodoUseCase.mockReturnValue({ updateData });

        // Act
        const { container } = render(<TodoPage params={{ id: "1" }} />);

        // Assert
        expect(screen.getByText("failed to load")).toBeInTheDocument();
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

        mockTodoUseCase.mockReturnValue({ data, isLoading, error });
        mockCreateTodoUseCase.mockReturnValue({ updateData });

        // Act
        const { container } = render(<TodoPage params={{ id: "1" }} />);

        fireEvent.input(screen.getByPlaceholderText("Title"), {
            target: {
                value: "create title",
            },
        });

        screen.debug();


        await waitFor(() => {
            fireEvent.click(screen.getByTestId("submit"));
        });

        // Assert
        expect(mockCreateTodoUseCase).toHaveBeenCalled();
        expect(mockCreateTodoUseCase).toHaveBeenCalledWith({ requestBody: { id: "1", title: "create title" }, queryParams: { id: "1" } });
        expect(mockPush).toHaveBeenCalledWith("/presentation/todos");

    });
});