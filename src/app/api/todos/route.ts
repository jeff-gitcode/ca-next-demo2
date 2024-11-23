import { NextResponse } from 'next/server';

import { ApplicationContainer } from '@/app/di';
import { createTodo } from '@/app/infrastrcutrue/todos/todo.service';
import { TYPES } from '@/app/types';
import { ITodoUseCase } from '@/app/application/abstract/todos/itodo.usecase';
import { Todo } from '@/app/domain/todo';

export async function GET() {
  try {
    const todoUseCase: ITodoUseCase = ApplicationContainer.get<ITodoUseCase>(
      TYPES.TodoUseCase,
    );
    const response = await todoUseCase.GetTodos();

    return NextResponse.json(response);
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    const data: Todo = {
      id: '',
      title,
    };
    const todoUseCase: ITodoUseCase = ApplicationContainer.get<ITodoUseCase>(
      TYPES.TodoUseCase,
    );

    const response = await todoUseCase.AddTodo(data);

    return NextResponse.json(response);
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
