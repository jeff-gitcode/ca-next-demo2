'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FormValue, todoSchema } from '../../../application/validator/todo';
import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useAppContext } from '@/app/application/hooks/app.context';

// Interface for our form values that drastically improves type safety for our form
// export interface FormValues {
//     title: string;
// }

// type FormData = z.infer<typeof todoSchema>;

// export interface InputProps
//     extends React.InputHTMLAttributes<HTMLInputElement> {
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//     ({ type, ...props }, ref) => {
//         return (
//             <input
//                 type={type}
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                 ref={ref}
//                 {...props}
//             />
//         )
//     }
// )
// Input.displayName = "Input"

export default function NewTodo() {
  // const { register } = useForm<FormValues>();
  // const actions = async (data: FormValues) => {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     console.log(isSubmitting);
  //     console.log(data);
  // };

  const { createTodoUseCase } = useAppContext();
  const { createData, createTodo, isCreating } = createTodoUseCase();

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValue>({
    defaultValues: { id: '', title: '' },
    resolver: zodResolver(todoSchema),
  });

  // const { register, handleSubmit } = useForm<FormValues>();

  // const actions: () => void = handleSubmit(async (data: FormData) => {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     console.log(isSubmitting);
  //     console.log(data);
  //     createTodo({ requestBody: data });

  //     redirect('/presentation/todos');
  // });

  const onSubmit = async (data: FormValue) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await createTodo({
      requestBody: data,
    });

    router.push(`/presentation/todos`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center space-y-2"
    >
      <input
        className="bg-grey-100 peer block flex rounded-lg px-1 py-1 text-black"
        disabled={true}
        placeholder="ID"
        {...register('id')}
      />
      <input
        className="flex rounded-lg px-1 py-1 text-black"
        placeholder="Title"
        {...register('title')}
      />
      {/* {errors?.title && (
                <p className="text-red-600 text-sm">
                    {errors?.title?.message}
                </p>
            )} */}
      <ErrorMessage name="title" errors={errors} />
      {/* <button className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5" type="submit">
                Confirm
            </button> */}
      <input type="submit" data-testid="submit" />
    </form>
  );
}
