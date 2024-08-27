"use client";

import Link from 'next/link';

import { useDeleteTodo, useTodos } from '../../application/useTodo';
import { Todo } from '../../domain/todo';

export default function TodoPage() {
  const { data, error } = useTodos();
  const {
    deleteData,
    deleteTodo,
    isDeleting,
  } = useDeleteTodo();

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data);

  function onDelete(id: string): void {
    deleteTodo({ queryParams: { id: id } });
  }

  return (<div className='max-w-3xl mx-auto'>
    <header className='p-6 border-b flex items-center justify-between bg-blue-500 rounded-lg'>
      <Link className='text-2xl font-bold' href="/todos">Todos</Link>
      <Link className='text-2xl font-bold bg-green-500 grid place-items-center px-4 py-2 rounded-full' href="/presentation/todos/new">Create</Link>
    </header>
    <main className="p-4 text-large">
      {data?.map((todo: Todo) => (
        <div key={todo.id} className="p-4 my-2 rounded-md border-b leading-8">
          <div className="font-bold">{todo.title}</div>
          <div className="flex gap-3 justify-end">
            <Link className="bg-slate-200 text-black py-2 px-4 rounded-md text-sm uppercase font-bold" href={`/presentation/todos/${todo.id}`}>Edit</Link>
            <button className="bg-red-500 py-2 px-4 rounded-md text-sm uppercase font-bold" onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </div>))}
    </main>
  </div >);
}