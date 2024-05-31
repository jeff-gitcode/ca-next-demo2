"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { todoSchema } from "./todo";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useCreateTodo } from "../useTodo";
import { redirect } from "next/navigation";

// Interface for our form values that drastically improves type safety for our form
// export interface FormValues {
//     title: string;
// }

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

export default function Form() {
    // const { register } = useForm<FormValues>();
    // const actions = async (data: FormValues) => {
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //     console.log(isSubmitting);
    //     console.log(data);
    // };
    const {
        createData,
        createTodo,
        isCreating,
    } = useCreateTodo();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        defaultValues: { id: "", title: "" },
        resolver: zodResolver(todoSchema),
    });

    // const { register, handleSubmit } = useForm<FormValues>();


    const actions: () => void = handleSubmit(async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(isSubmitting);
        console.log(data);
        createTodo({ requestBody: data });

        redirect('/todos');
    });

    return (
        <form
            action={actions}
            className="flex flex-col items-center space-y-2">
            <Input className="text-black flex rounded-lg px-1 py-1" placeholder="Title" {...register('title')} />
            {/* {errors?.title && (
                <p className="text-red-600 text-sm">
                    {errors?.title?.message}
                </p>
            )} */}
            <ErrorMessage name="title" errors={errors} />
            <button className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5" type="submit">
                Confirm
            </button>
        </form>
    )
}