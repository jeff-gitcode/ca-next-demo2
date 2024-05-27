import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

async function getTodo(id: string) {
    try {
        const response = await fetch(`http://localhost:8090/api/collections/todo/records/${id}`);
        console.log(response.body);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch todos");
    }
}

async function updateTodo(id: string, req: Request) {
    try {
        const response = await fetch(`http://localhost:8090/api/collections/todo/records/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(await req.json()),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update todos");
    }
}

async function deleteTodo(id: string) {
    try {
        const response = await fetch(`http://localhost:8090/api/collections/todo/records/${id}`, {
            method: 'DELETE',
            headers: {
                "Accept": 'text/plain',
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to delete todos");
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const response = await getTodo(id);
        return NextResponse.json(response);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const response = await updateTodo(id, req);
        return NextResponse.json(response);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const response = await deleteTodo(id);
        return NextResponse.json("todo deleted");
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}