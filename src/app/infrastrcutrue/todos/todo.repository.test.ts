import { Todo } from "@/app/domain/todo";
import { TodoRepository } from "./todo.repository";
import { ITodoService } from "./todo.service";

const mockTodo: Todo = {
    title: "title",
    id: "1"
};

describe("todo.repository", () => {
    // Arrange
    let todoRepository: TodoRepository;
    let todoService: ITodoService;

    beforeEach(() => {
        todoService = {
            createTodo: jest.fn().mockReturnValue(Promise.resolve(mockTodo)),
            deleteTodo: jest.fn().mockReturnValue(Promise.resolve("1")),
            getTodo: jest.fn().mockReturnValue(Promise.resolve(mockTodo)),
            getTodos: jest.fn().mockReturnValue(Promise.resolve([mockTodo])),
            updateTodo: jest.fn().mockReturnValue(Promise.resolve(mockTodo))
        } as any;

        todoRepository = new TodoRepository(todoService);
    });

    test("when addTodo should return", async () => {
        // Act
        const result = await todoRepository.addTodo(mockTodo);

        // Assert
        expect(result).toEqual(mockTodo);
        expect(todoService.createTodo).toHaveBeenCalledWith(mockTodo);
    });

    test("when getTodos should return", async () => {
        // Act
        const result = await todoRepository.getTodos();

        // Assert
        expect(result).toEqual([mockTodo]);
        expect(todoService.getTodos).toHaveBeenCalled();
    });

    test("when getTodoById should return", async () => {
        // Act
        const result = await todoRepository.getTodoById("1");

        // Assert
        expect(result).toEqual(mockTodo);
        expect(todoService.getTodo).toHaveBeenCalledWith("1");
    });

    test("when updateTodoById should return", async () => {
        const request = {
            title: "title"
        } as any;


        // Act
        const result = await todoRepository.updateTodoById("1", request);

        // Assert
        expect(result).toEqual(mockTodo);
        expect(todoService.updateTodo).toHaveBeenCalledWith("1", request);
    });

    test("when deleteTodoById should return", async () => {
        // Act
        const result = await todoRepository.deleteTodoById("1");

        // Assert
        expect(result).toEqual("1");
        expect(todoService.deleteTodo).toHaveBeenCalledWith("1");
    });
});