'use client';

import Link from 'next/link';
import { useContext } from 'react';

import {
  TodoListUseCase,
  useDeleteTodoUseCase,
} from '../../application/hooks/use.todo.controller';
import { Todo } from '../../domain/todo';
import { useAppContext } from '@/app/application/hooks/app.context';

interface TodoPageProps {
  todoListUseCase: TodoListUseCase;
}

const TodoListPage = () => {
  const { todoListUseCase, deleteTodoUseCase } = useAppContext();
  const { data, isLoading, error } = todoListUseCase();
  const { deleteData, deleteTodo, isDeleting } = deleteTodoUseCase();

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data);

  function onDelete(id: string): void {
    deleteTodo({ queryParams: { id: id } });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <header className="flex items-center justify-between rounded-lg border-b bg-blue-500 p-6">
        <Link className="text-2xl font-bold" href="/todos">
          Todos
        </Link>
        <Link
          className="grid place-items-center rounded-full bg-green-500 px-4 py-2 text-2xl font-bold"
          href="/presentation/todos/new"
        >
          Create
        </Link>
      </header>
      <main className="text-large p-4">
        {data?.map((todo: Todo) => (
          <div key={todo.id} className="my-2 rounded-md border-b p-4 leading-8">
            <div className="font-bold">{todo.title}</div>
            <div className="flex justify-end gap-3">
              <Link
                className="rounded-md bg-slate-200 px-4 py-2 text-sm font-bold uppercase text-black"
                href={`/presentation/todos/${todo.id}`}
              >
                Edit
              </Link>
              <button
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-bold uppercase"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default TodoListPage;
