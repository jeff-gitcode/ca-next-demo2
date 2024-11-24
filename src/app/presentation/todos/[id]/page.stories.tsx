import { ApplicationContainer } from '@/app/di';
import { ApplicationProvider } from '@/app/presentation/applicationProvider';
import TodoPage from '@/app/presentation/todos/[id]/page';
import { Meta, StoryObj } from '@storybook/react';
import * as actual from '@/app/application/hooks/app.context';

import { fn } from '@storybook/test';

export const useAppContext = fn(actual.useAppContext).mockName('useAppContext');

const meta = {
  title: 'TodoPage',
  component: TodoPage,
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
      <ApplicationProvider container={ApplicationContainer}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ApplicationProvider>
    ),
  ],
  args: {
    params: { id: '1' },
  },
} satisfies Meta<typeof TodoPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  beforeEach: () => {
    // jest.clearAllMocks();

    useAppContext.mockReturnValue({
      todoListUseCase: () => ({
        data: [
          {
            id: '1',
            title: 'test title',
            description: 'test description',
            status: 'test status',
          },
        ],
        isLoading: false,
        error: '',
      }),
      todoUseCase: () => ({
        data: { id: '1', title: 'test title' },
        isLoading: false,
        error: '',
      }),
      updateTodoUseCase: () => ({
        updateData: null,
        updateTodo: fn(),
        isUpdating: false,
      }),
    });
  },
  args: {
    params: { id: '1' },
  },
};
