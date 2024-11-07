import { injectable } from "inversify";

import { Todo } from "../../domain/todo";

export abstract class ITodoService {
    abstract getTodos(): Promise<Todo[]>;
    abstract createTodo(data: { title: string }): Promise<Todo>;
    abstract getTodo(id: string): Promise<Todo>;
    abstract updateTodo(id: string, req: Request): Promise<Todo>;
    abstract deleteTodo(id: string): Promise<string>;
}

@injectable()
export class TodoService implements ITodoService {
    async getTodos(): Promise<Todo[]> {
        try {
            const url = `${process.env.PATH_API_URL_BACKEND}/api/collections/todo/records?page=1&perPage=10`;
            console.log(url);
            const response = await fetch(url);
            console.log(response.body);
            const data = await response.json();
            console.log(data);
            return data?.items as Todo[];
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch todos");
        }
    }

    async createTodo(data: { title: string }): Promise<Todo> {
        try {
            console.log(data.title);
            const response = await fetch(
                `${process.env.PATH_API_URL_BACKEND}/api/collections/todo/records`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: data.title,
                        content: "",
                    }),
                }
            );
            const result = await response.json();
            return result;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to create todo");
        }
    }

    async getTodo(id: string): Promise<Todo> {
        try {
            const response = await fetch(
                `${process.env.PATH_API_URL_BACKEND}/api/collections/todo/records/${id}`
            );
            console.log(response.body);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch todos");
        }
    }

    async updateTodo(id: string, req: Request): Promise<Todo> {
        try {
            const response = await fetch(
                `${process.env.PATH_API_URL_BACKEND}/api/collections/todo/records/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(await req.json()),
                }
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to update todos");
        }

    }

    async deleteTodo(id: string): Promise<string> {
        try {
            const response = await fetch(
                `${process.env.PATH_API_URL_BACKEND}/api/collections/todo/records/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "text/plain",
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to delete todos");
        }
    }
}

// const getTodos = async (): Promise<Todo[]> => {
//     try {
//         const url = `${process.env.PATH_API_URL_BACKEND}/api/collections/todo/records?page=1&perPage=10`;
//         console.log(url);
//         const response = await fetch(url);
//         console.log(response.body);
//         const data = await response.json();
//         console.log(data);
//         return data?.items as Todo[];
//     } catch (e) {
//         console.error(e);
//         throw new Error("Failed to fetch todos");
//     }
// };

const createTodo = async (data: { title: string }): Promise<Todo> => {
    try {
        console.log(data.title);
        const response = await fetch(
            `${process.env.PATH_API_URL_BACKEND}/api/collections/todo/records`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    content: "",
                }),
            }
        );
        const result = await response.json();
        return result;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to create todo");
    }
};

const getTodo = async (id: string): Promise<Todo> => {
    try {
        const response = await fetch(
            `${process.env.PATH_API_URL_BACKEND}/api/collections/todo/records/${id}`
        );
        console.log(response.body);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch todos");
    }
};

const updateTodo = async (id: string, req: Request): Promise<Todo> => {
    try {
        const response = await fetch(
            `${process.env.PATH_API_URL_BACKEND}/api/collections/todo/records/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(await req.json()),
            }
        );
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update todos");
    }
};

const deleteTodo = async (id: string): Promise<string> => {
    try {
        const response = await fetch(
            `${process.env.PATH_API_URL_BACKEND}/api/collections/todo/records/${id}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "text/plain",
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to delete todos");
    }
};

export { createTodo, getTodo, updateTodo, deleteTodo };
