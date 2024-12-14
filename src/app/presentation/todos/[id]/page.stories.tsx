import { ApplicationContainer } from '@/app/di';
import { ApplicationProvider } from '@/app/presentation/applicationProvider';
import TodoPage from '@/app/presentation/todos/[id]/page';
import { Meta, StoryObj } from '@storybook/react';
import ApplicationContext, * as actual from '@/app/application/hooks/app.context';
import { userEvent, within, expect, waitFor } from '@storybook/test';

import { fn } from '@storybook/test';
import { Container } from 'inversify';
import exp from 'constants';
import { testData } from '../test.data';

const useAppContext = fn(actual.useAppContext).mockName('useAppContext');

const meta = {
  title: 'UpdateTodoPage',
  component: TodoPage,
  tags: ['pages', 'todos', 'autodocs'],
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
  args: {
    params: { id: '1' },
  },
} satisfies Meta<typeof TodoPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  beforeEach: () => {
    useAppContext.mockReturnValue(testData);
  },
  args: {
    params: { id: '1' },
  },
};

export const FilledForm: Story = {
  beforeEach: () => {
    useAppContext.mockReturnValue(testData);
  },
  args: {
    params: { id: '1' },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const { updateTodoUseCase } = useAppContext();

    const title = canvas.getByPlaceholderText('Title');
    await userEvent.type(title, ' update');

    const submit = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(submit);

    // await canvas.getByText('test title update');
    // await expect(updateTodo).toHaveBeenCalled();
    await waitFor(
      async () =>
        await expect(
          useAppContext().updateTodoUseCase().updateTodo,
        ).toHaveBeenCalled(),
    );
    // await expect(updateTodo).toHaveBeenCalled(); // With({ id: '1', title: 'new title' });
  },
};
