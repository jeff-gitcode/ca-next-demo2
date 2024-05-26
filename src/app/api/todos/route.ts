import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

async function getTodos() {
    try {
        const response = await fetch('http://localhost:8090/api/collections/todo/records?page=1&perPage=10');
        console.log(response.body);
        const data = await response.json();
        console.log(data);
        return data?.items as any[];
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch todos");
    }
}

async function createTodo(data: { title: string }) {
    try {
        console.log(data.title);
        const response = await fetch('http://localhost:8090/api/collections/todo/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: data.title,
                content: ""
            }),
        });
        const result = await response.json();
        return result;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to create todo");
    }
}

export async function GET() {
    try {
        const response = await getTodos();
        return NextResponse.json(response);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title } = await req.json();

        const data = { title };

        const response = await createTodo(data);

        return NextResponse.json(response);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}