import { ApplicationContainer } from '@/app/di';
import { ApplicationProvider } from '@/app/presentation/applicationProvider';
import TodoListPage from '@/app/presentation/todos/page';
import { Meta, StoryObj } from '@storybook/react';
import ApplicationContext, * as actual from '@/app/application/hooks/app.context';

import { Container } from 'inversify';
import { mockDeleteTodo, testData } from './test.data';
import { userEvent, within, fn, expect, waitFor } from '@storybook/test';
import { Router } from 'next/router';
import exp from 'constants';

const useAppContext = fn(actual.useAppContext).mockName('useAppContext');

const meta = {
  title: 'TodoListPage',
  tags: ['pages', 'todos', 'autodocs'],
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

const routerPush = fn();
export const CreateAction: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        push: routerPush,
      },
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
      expect(routerPush).toHaveBeenCalled();
    });
  },
};

export const UpdateAction: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        push: routerPush,
      },
    },
  },
  beforeEach: () => {
    // jest.clearAllMocks();
    useAppContext.mockReturnValue(testData);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (let i = 0; i < 2; i++) {
      const updateLink = canvas
        .getAllByRole('link', { name: /Edit/i })
        .find((link) => link.id === i.toString());
      await expect(updateLink).toBeInTheDocument();

      console.log(updateLink);
      await updateLink!.click();

      await waitFor(async () => {
        expect(routerPush).toHaveBeenCalled();
      });
    }
  },
};
