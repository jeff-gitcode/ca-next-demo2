import { NextResponse } from "next/server";

import { ApplicationContainer } from "@/app/di";
import { createTodo, ITodoService } from "@/app/infrastrcutrue/todos/todo.service";
import { TYPES } from "@/app/types";

export async function GET() {
    try {
        const todoService: ITodoService = ApplicationContainer.get<ITodoService>(TYPES.TodoService);
        const response = await todoService.getTodos();
        return NextResponse.json(response);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title } = await req.json();

        const data = { title };

        const response = await createTodo(data);

        return NextResponse.json(response);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}