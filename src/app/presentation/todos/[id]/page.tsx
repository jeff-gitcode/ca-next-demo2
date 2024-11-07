'use client';

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/app/application/hooks/app.context";
import { todoSchema } from "@/app/application/validator/todo";
import { redirect } from "next/navigation";

type FormData = z.infer<typeof todoSchema>;

export default function TodoPage({ params }: { params: { id: string } }) {
    const id = params.id;

    const { todoUseCase, updateTodoUseCase } = useAppContext();
    const { updateData, updateTodo, isUpdating } = updateTodoUseCase();
    const { data, isLoading, error } = todoUseCase(id);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        defaultValues: { id: "", title: "" },
        resolver: zodResolver(todoSchema),
        values: data,
    });

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    const onSubmit = async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await updateTodo({ requestBody: data, queryParams: { id: id } });

        redirect(`/presentation/todos`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                className="text-black flex rounded-lg px-1 py-1 bg-grey-100 peer block"
                type="text"
                placeholder="Title"
                {...register("title")}
            />
            <button type="submit">Submit</button>
        </form>
    );
};