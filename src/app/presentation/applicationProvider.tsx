'use client';

// import { createContext } from 'react';

// export const MyContext = createContext("");


import React, { useContext, ReactNode } from "react";

import { Container, interfaces } from "inversify";
import { CreateTodoUseCase, DeleteTodoUseCase, TodoListUseCase, TodoUseCase, UpdateTodoUseCase, useCreateTodoUseCase, useDeleteTodoUseCase, useTodoListUseCase, useTodoUseCase, useUpdateTodoUseCase } from "../application/hooks/use.todo.controller";
import ApplicationContext, { ApplicationContextType } from "../application/hooks/app.context";


/**
 * @todo inline component Props
 */
type Props = {
    children: ReactNode;
    container: Container;
};

export const ApplicationProvider: React.FC<Props> = (props) => {
    const todoListUseCase: TodoListUseCase = useTodoListUseCase;
    const todoUseCase: TodoUseCase = useTodoUseCase;
    const createTodoUseCase: CreateTodoUseCase = useCreateTodoUseCase;
    const updateTodoUseCase: UpdateTodoUseCase = useUpdateTodoUseCase;
    const deleteTodoUseCase: DeleteTodoUseCase = useDeleteTodoUseCase;

    const value: ApplicationContextType = {
        container: props.container,
        todoListUseCase: todoListUseCase,
        todoUseCase: todoUseCase,
        createTodoUseCase: createTodoUseCase,
        updateTodoUseCase: updateTodoUseCase,
        deleteTodoUseCase: deleteTodoUseCase,
    };

    return <ApplicationContext.Provider value={value}>
        {props.children}
    </ApplicationContext.Provider>;
};

// import { createContext, ReactNode } from 'react';
// import React from 'react';
// import { Container } from 'inversify';

// interface ContextValue {
//     container: Container | null;
// }

// const ApplicationContext = createContext<ContextValue>({} as ContextValue);

// export const useApplication = (): ContextValue => {
//     return React.useContext(ApplicationContext);
// };

// type Props = {
//     children: ReactNode;
//     container: Container;
// }

// export const ApplicationProvider: React.FC<Props> = (props: Props) => {
//     return (<ApplicationContext.Provider
//         value={{
//             container: props.container,
//         }}>
//         {props.children}
//     </ApplicationContext.Provider>);
// }

