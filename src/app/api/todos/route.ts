import { createTodo, getTodos } from "@/app/infrastrcutrue/todos/service";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const response = await getTodos();
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