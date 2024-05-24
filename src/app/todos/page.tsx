import useSWR from 'swr';

async function fetcher(...args: Parameters<typeof fetch>) {
  return (await fetch(...args)).json();
}

async function getTodos() {
    const response = await fetch('http://127.0.0.1:8090/api/collections/todo/records?page=1&perPage=10');
    console.log(response.body);
    const data = await response.json();   
    console.log(data);
    return data?.items as any[];
}

export default async function TodoPage() {
    // const { data, error } = useSWR('todos', fetcher);
    // if (error) return <div>failed to load</div>;
    // if (!data) return <div>loading...</div>;
    const data = await getTodos();
console.log(data);
  return (
    <div>
      <h1>Todo</h1>
        <ul>
            {data?.map((todo) => (
            <li key={todo.id}>
                {todo.title} | 
                {todo.content}
            </li>
            ))}
        </ul>
    </div>
  );
}