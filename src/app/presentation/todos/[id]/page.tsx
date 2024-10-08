'use client';

import * as z from "zod";
import { todoSchema } from "../../../application/validator/todo";
import { useTodoUseCase, useUpdateTodoUseCase } from "../../../application/hooks/use.todo.controller";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { redirect } from "next/navigation";
import { ApplicationContext } from "../../applicationProvider";

type FormData = z.infer<typeof todoSchema>;

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ type, ...props }, ref) => {
        return (
            <input
                type={type}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export default function TodoPage({ params }: { params: { id: string } }) {
    const id = params.id;

    const { todoUseCase, updateTodoUseCase } = useContext(ApplicationContext);
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

    console.log(data);

    const actions: () => void = handleSubmit(async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(isSubmitting);
        console.log(data);
        updateTodo({ requestBody: data, queryParams: { id: id } });

        redirect('/presentation/todos');
    });

    return (
        <form
            action={actions}
            className="flex flex-col items-center space-y-2">
            <Input className="text-black flex rounded-lg px-1 py-1 bg-grey-100 peer block" disabled={true} placeholder="ID" {...register('id')} />
            <Input className="text-black flex rounded-lg px-1 py-1" placeholder="Title" {...register('title')} />
            <ErrorMessage name="title" errors={errors} />
            <button className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5" type="submit">
                Confirm
            </button>
        </form>
    )
}