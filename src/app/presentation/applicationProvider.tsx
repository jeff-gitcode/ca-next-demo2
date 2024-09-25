'use client';

import { createContext, ReactNode } from 'react';
import React from 'react';
import { Container } from 'inversify';

interface ContextValue {
    container: Container | null;
}

const ApplicationContext = createContext<ContextValue>({} as ContextValue);

export const useApplication = (): ContextValue => {
    return React.useContext(ApplicationContext);
};

type Props = {
    children: ReactNode;
    container: Container;
}

export const ApplicationProvider: React.FC<Props> = (props: Props) => {
    return (<ApplicationContext.Provider
        value={{
            container: props.container,
        }}>
        {props.children}
    </ApplicationContext.Provider>);
}