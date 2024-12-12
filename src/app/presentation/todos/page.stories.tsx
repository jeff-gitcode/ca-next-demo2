import { ApplicationContainer } from '@/app/di';
import { ApplicationProvider } from '@/app/presentation/applicationProvider';
import TodoListPage from '@/app/presentation/todos/page';
import { Meta, StoryObj } from '@storybook/react';
import ApplicationContext, * as actual from '@/app/application/hooks/app.context';

import { Container } from 'inversify';
import { mockDeleteTodo, testData } from './test.data';
import { userEvent, within, fn, expect, waitFor } from '@storybook/test';

const useAppContext = fn(actual.useAppContext).mockName('useAppContext');

const meta = {
  title: 'TodoListPage',
  component: TodoListPage,
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
} satisfies Meta<typeof TodoListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  beforeEach: () => {
    // jest.clearAllMocks();
    useAppContext.mockReturnValue(testData);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const deleteButton = canvas
      .getAllByRole('button', { name: /Delete/i })
      .find((button) => button.id === '0');
    await expect(deleteButton).toBeInTheDocument();
    await deleteButton!.click();

    await waitFor(async () => {
      await expect(mockDeleteTodo).toHaveBeenCalled();
    });
  },
};

export const DeleteAction: Story = {
  beforeEach: () => {
    // jest.clearAllMocks();
    useAppContext.mockReturnValue(testData);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (let i = 0; i < 2; i++) {
      const deleteButton = canvas
        .getAllByRole('button', { name: /Delete/i })
        .find((button) => button.id === i.toString());
      await expect(deleteButton).toBeInTheDocument();
      await deleteButton!.click();

      await waitFor(async () => {
        await expect(mockDeleteTodo).toHaveBeenCalled();
      });
    }
  },
};

export const CreateAction: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  beforeEach: () => {
    // jest.clearAllMocks();
    useAppContext.mockReturnValue(testData);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const createButtonLink = canvas.getByRole('link', { name: /Create/i });
    await expect(createButtonLink).toBeInTheDocument();
    console.log(createButtonLink);
    await createButtonLink.click();

    await waitFor(async () => {
      await expect(createButtonLink.onclick).toHaveBeenCalled();
      // expect(window.location.pathname).toBe('/todos/new');
    });
  },
};
