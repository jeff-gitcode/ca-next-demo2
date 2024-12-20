import { ApplicationContainer } from '@/app/di';
import { ApplicationProvider } from '@/app/presentation/applicationProvider';
import NewTodo from '@/app/presentation/todos/new/page';
import { Meta, StoryObj } from '@storybook/react';
import ApplicationContext, * as actual from '@/app/application/hooks/app.context';

import { userEvent, within, fn, expect, waitFor } from '@storybook/test';
import { Container } from 'inversify';
import { mockCreateTodo, testData } from '../test.data';

const useAppContext = fn(actual.useAppContext).mockName('useAppContext');

const meta = {
  title: 'NewTodo',
  component: NewTodo,
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
} satisfies Meta<typeof NewTodo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  beforeEach: () => {
    useAppContext.mockReturnValue(testData);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByPlaceholderText('Title');
    await userEvent.type(title, 'new todo', { delay: 100 });

    const submit = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(submit, { delay: 1000 });

    await waitFor(async () => {
      expect(await mockCreateTodo).toHaveBeenCalled();
    });
  },
};

export const Error: Story = {
  beforeEach: () => {
    useAppContext.mockReturnValue(testData);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByPlaceholderText('Title');
    await userEvent.clear(title);

    const submit = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(submit, { delay: 1000 });

    await waitFor(async () => {
      const errorMessage = await canvas.findByText(
        'String must contain at least 1 character(s)',
      );
      await expect(errorMessage).toBeInTheDocument();

      expect(await mockCreateTodo).not.toHaveBeenCalled();
    });
  },
};
