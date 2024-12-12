import { ApplicationContainer } from '@/app/di';
import { ApplicationProvider } from '@/app/presentation/applicationProvider';
import Nav from '@/app/presentation/nav';
import { Meta, StoryObj } from '@storybook/react';
import ApplicationContext, * as actual from '@/app/application/hooks/app.context';

import { fn } from '@storybook/test';
import { Container } from 'inversify';
import { testData } from './todos/test.data';

const useAppContext = fn(actual.useAppContext).mockName('useAppContext');

const meta = {
  title: 'Nav',
  component: Nav,
  parameters: {
    controls: { expanded: true },
    nextjs: {
      // 👇 As in the Next.js application, next/navigation only works using App Router
      appDirectory: true,
    },
    jest: ['page.test.tsx'],
  },
  decorators: [
    (Story) => (
      <ApplicationContext.Provider
        value={{
          container: ApplicationContainer,
          todoListUseCase: () => ({
            data: [
              {
                id: '1',
                title: 'test title1',
              },
              {
                id: '2',
                title: 'test title2',
              },
            ],
            isLoading: false,
            error: '',
          }),
          todoUseCase: (id: string) => ({
            data: { id: id, title: 'test title' },
            isLoading: false,
            error: '',
          }),
          createTodoUseCase: () => ({
            createData: undefined,
            createTodo: undefined,
            isCreating: false,
          }),
          updateTodoUseCase: useAppContext().updateTodoUseCase,
          deleteTodoUseCase: useAppContext().deleteTodoUseCase,
        }}
      >
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ApplicationContext.Provider>
    ),
  ],
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  beforeEach: () => {
    // jest.clearAllMocks();
    useAppContext.mockReturnValue(testData);
  },
  // args: {
  //   params: { id: '1' },
  // },
};
