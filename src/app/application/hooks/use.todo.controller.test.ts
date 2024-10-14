import { renderHook } from "@testing-library/react";
import useSWR from "swr";

import { useTodoListUseCase } from "./use.todo.controller";

jest.mock("swr");

describe("useTodoListUseCase", () => {
    test("should return", () => {
        // Arrange
        (useSWR as jest.Mock).mockReturnValue({
            data: [],
            error: undefined,
            isLoading: false
        });

        // Act
        const { result } = renderHook(() => useTodoListUseCase());

        // Assert
        expect(result.current).toEqual({
            data: [],
            error: undefined,
            isLoading: false
        });
    });
});

describe("useTodoUseCase", () => {
    test("should return", () => {
        // Arrange
        (useSWR as jest.Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: false
        });

        // Act
        const { result } = renderHook(() => useTodoListUseCase());

        // Assert
        expect(result.current).toEqual({
            data: undefined,
            error: undefined,
            isLoading: false
        });
    });
});

describe("useUpdateTodoUseCase", () => {
    test("should return", () => {
        // Arrange
        (useSWR as jest.Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: false
        });

        // Act
        const { result } = renderHook(() => useTodoListUseCase());

        // Assert
        expect(result.current).toEqual({
            data: undefined,
            error: undefined,
            isLoading: false
        });
    });
});

describe("useCreateTodoUseCase", () => {
    test("should return", () => {
        // Arrange
        (useSWR as jest.Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: false
        });

        // Act
        const { result } = renderHook(() => useTodoListUseCase());

        // Assert
        expect(result.current).toEqual({
            data: undefined,
            error: undefined,
            isLoading: false
        });
    });
});

describe("useDeleteTodoUseCase", () => {
    test("should return", () => {
        // Arrange
        (useSWR as jest.Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: false
        });

        // Act
        const { result } = renderHook(() => useTodoListUseCase());

        // Assert
        expect(result.current).toEqual({
            data: undefined,
            error: undefined,
            isLoading: false
        });
    });
});