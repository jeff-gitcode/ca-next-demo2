import Link from 'next/link';
import useSWR from 'swr';

// async function fetcher(...args: Parameters<typeof fetch>) {
//   return (await fetch(...args)).json();
// }

// async function getTodos() {
//   const response = await fetch('http://127.0.0.1:8090/api/collections/todo/records?page=1&perPage=10');
//   console.log(response.body);
//   const data = await response.json();
//   console.log(data);
//   return data?.items as any[];
// }

export default async function TodoPage() {
  // const { data, error } = useSWR('todos', fetcher);
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  // const data = await getTodos();
  // console.log(data);
  // return (
  //   <div>
  //     <h1>Todo</h1>
  //       <ul>
  //           {data?.map((todo) => (
  //           <li key={todo.id}>
  //               {todo.title} | 
  //               {todo.content}
  //           </li>
  //           ))}
  //       </ul>
  //   </div>
  // );

  return (<div className='max-w-3xl mx-auto'>
    <header className='p-6 border-b flex items-center justify-between bg-blue-500 rounded-lg'>
      <Link className='text-2xl font-bold' href="/todos">Todos</Link>
      <Link className='text-2xl font-bold bg-green-500 grid place-items-center px-4 py-2 rounded-full' href="/todos/new">Create</Link>
    </header>
    <main className="p-4 text-large">
      <div className="p-4 my-2 rounded-md border-b leading-8">
        <div className="font-bold">Todo</div>
        <div className="flex gap-3 justify-end">
          <Link className="bg-slate-200 text-black py-2 px-4 rounded-md text-sm uppercase font-bold" href="/todos/1">Edit</Link>
          <button className="bg-red-500 py-2 px-4 rounded-md text-sm uppercase font-bold">Delete</button>
        </div>
      </div>
    </main>

  </div >);
}