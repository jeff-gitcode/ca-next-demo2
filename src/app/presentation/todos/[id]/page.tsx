'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/app/application/hooks/app.context";
import { FormValue, todoSchema } from "@/app/application/validator/todo";
import { redirect } from "next/navigation";
import { ErrorMessage } from "@hookform/error-message";

export default function TodoPage({ params }: { params: { id: string } }) {

    const id = params.id;

    const { todoUseCase, updateTodoUseCase } = useAppContext();
    const { updateData, updateTodo, isUpdating } = updateTodoUseCase();
    const { data, isLoading, error } = todoUseCase(id);

    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormValue>({
        defaultValues: { id: "", title: "" },
        resolver: zodResolver(todoSchema),
        values: data,
    });

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    const onSubmit = async (data: FormValue) => {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        await updateTodo({ requestBody: data, queryParams: { id: id } });

        router.push(`/presentation/todos`);
        // redirect(`/presentation/todos`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-2">
            <input className="text-black flex rounded-lg px-1 py-1 bg-grey-100 peer block" disabled={true} placeholder="ID" {...register('id')} />
            <input className="text-black flex rounded-lg px-1 py-1" placeholder="Title" {...register('title')} />
            <ErrorMessage name="title" errors={errors} />
            {/* <button className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5" type="submit">
                Confirm
            </button> */}
            <input type="submit" data-testid="submit" />

        </form>
    );
};