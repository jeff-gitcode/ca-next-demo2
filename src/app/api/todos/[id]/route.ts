import { getTodo, updateTodo, deleteTodo } from "@/app/infrastrcutrue/todos/todo.service";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const response = await getTodo(id);
        return NextResponse.json(response);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const response = await updateTodo(id, req);
        return NextResponse.json(response);
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const response = await deleteTodo(id);
        return NextResponse.json("todo deleted");
    } catch (e: unknown) {
        console.error(e);
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}