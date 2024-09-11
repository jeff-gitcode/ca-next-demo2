import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import { ITodoUseCase } from "@/app/application/abstract/todos/itodo.usecase";
import { ApplicationContainer } from "@/app/di";
import { getTodo, updateTodo, deleteTodo } from "@/app/infrastrcutrue/todos/todo.service";
import { TYPES } from "@/app/types";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const todoUseCase: ITodoUseCase = ApplicationContainer.get<ITodoUseCase>(TYPES.TodoUseCase);
        const response = await todoUseCase.GetTodoById(id);

        return NextResponse.json(response);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const todoUseCase: ITodoUseCase = ApplicationContainer.get<ITodoUseCase>(TYPES.TodoUseCase);
        const response = await todoUseCase.UpdateTodoById(id, req);

        return NextResponse.json(response);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const todoUseCase: ITodoUseCase = ApplicationContainer.get<ITodoUseCase>(TYPES.TodoUseCase);
        const response = await todoUseCase.DeleteTodoById(id);

        return NextResponse.json("todo deleted");
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}