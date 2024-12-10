import { ApplicationContainer } from '@/app/di';
import { ApplicationProvider } from '@/app/presentation/applicationProvider';
import NewTodo from '@/app/presentation/todos/new/page';
import { Meta, StoryObj } from '@storybook/react';
import ApplicationContext, * as actual from '@/app/application/hooks/app.context';

import { fn } from '@storybook/test';
import { Container } from 'inversify';

export const useAppContext = fn(actual.useAppContext).mockName('useAppContext');

const meta = {
  title: 'NewTodo',
  component: NewTodo,
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
      <ApplicationContext.Provider value={useAppContext()}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ApplicationContext.Provider>
    ),
  ],
} satisfies Meta<typeof NewTodo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  beforeEach: () => {
    // jest.clearAllMocks();
    useAppContext.mockReturnValue({
      container: ApplicationContainer,
      todoListUseCase: () => ({
        data: [
          {
            id: '1',
            title: 'test title',
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
      updateTodoUseCase: () => ({
        updateData: null,
        updateTodo: fn(),
        isUpdating: false,
      }),
      createTodoUseCase: () => ({
        createData: null,
        createTodo: fn(),
        isCreating: false,
      }),
      deleteTodoUseCase: () => ({
        deleteData: null,
        deleteTodo: fn(),
        isDeleting: false,
      }),
    });
  },
  // args: {
  //   params: { id: '1' },
  // },
};
