import { ApplicationContainer } from '@/app/di';
import { ApplicationProvider } from '@/app/presentation/applicationProvider';
import { userEvent, within, fn, expect, waitFor } from '@storybook/test';

import Nav from '@/app/presentation/nav';
import { Meta, StoryObj } from '@storybook/react';
import ApplicationContext, * as actual from '@/app/application/hooks/app.context';

import { Container } from 'inversify';
import { testData } from './todos/test.data';

const useAppContext = fn(actual.useAppContext).mockName('useAppContext');

const meta = {
  title: 'Nav',
  component: Nav,
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
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  beforeEach: () => {
    // jest.clearAllMocks();
    useAppContext.mockReturnValue(testData);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const todos = canvas.getAllByRole('link', { name: /todos/i });
    await expect(todos).toHaveLength(1);
    await todos[0].click();
  },
};
