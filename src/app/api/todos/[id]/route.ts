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