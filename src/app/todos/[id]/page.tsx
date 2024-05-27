'use client';

import { useTodo } from "../useTodo";

export default function TodoPage({ params }: { params: { id: string } }) {
    const id = params.id;

    const { data, error } = useTodo(id);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    console.log(data);

    return <div className='max-w-3xl mx-auto'>Edit Todo</div>;
}