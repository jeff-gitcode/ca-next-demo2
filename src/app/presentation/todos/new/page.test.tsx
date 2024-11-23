import {
  fireEvent,
  prettyDOM,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { useRouter } from 'next/navigation';

import * as ApplicationContext from '@/app/application/hooks/app.context';
import NewTodo from './page';
import { ErrorMessage } from '@hookform/error-message';
import { create } from 'node_modules/axios/index.cjs';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      query: {
        id: '1',
      },
      push: mockPush,
    };
  },
}));

jest.mock('@/app/application/hooks/app.context', () => {
  const original: typeof ApplicationContext = jest.requireActual(
    '@/app/application/hooks/app.context',
  );

  return {
    ...original,
    useAppContext: jest.fn(),
  };
});
const mockUseAppContext = ApplicationContext.useAppContext as jest.Mock;

jest.mock('@hookform/error-message', () => {
  const original = jest.requireActual('@hookform/error-message');
  return {
    ...original,
    ErrorMessage: jest.fn((props) => <div {...props} />),
  };
});

describe('Page', () => {
  let mockCreateTodoUseCase: jest.Mock;

  beforeEach(() => {
    jest.setTimeout(10000);
    jest.clearAllMocks();

    mockCreateTodoUseCase = jest.fn();

    const contextValues = {
      createTodoUseCase: mockCreateTodoUseCase,
    };

    mockUseAppContext.mockReturnValue(contextValues);
  });

  test('should render', () => {
    // Arrange
    const data = {
      id: '1',
      title: 'test title',
    };

    const createData = undefined;
    const isCreating = true;
    const createTodo = undefined;

    mockCreateTodoUseCase.mockReturnValue({
      createData,
      createTodo,
      isCreating,
    });

    // Act
    const { container } = render(<NewTodo />);

    // Assert
    expect(screen.getByPlaceholderText('ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('should create todo', async () => {
    // Arrange
    const data = {
      id: '1',
      title: 'test title',
    };

    const isLoading = false;
    const error = undefined;
    const createData = undefined;
    const createTodo = jest.fn();
    const isCreating = false;

    mockCreateTodoUseCase.mockReturnValue({
      createData,
      createTodo,
      isCreating,
    });

    // Act
    const { container } = render(<NewTodo />);

    fireEvent.input(screen.getByPlaceholderText('Title'), {
      target: {
        value: 'create title',
      },
    });

    screen.debug();

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('submit'));
    });

    // Assert
    expect(mockCreateTodoUseCase).toHaveBeenCalled();
    expect(createTodo).toHaveBeenCalledWith({
      requestBody: { id: '', title: 'create title' },
    });
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/presentation/todos');
  });

  test('should not create todo', async () => {
    // Arrange
    const data = {
      id: '1',
      title: 'test title',
    };

    const createData = undefined;
    const createTodo = jest.fn();
    const isCreating = false;

    mockCreateTodoUseCase.mockReturnValue({
      createData,
      createTodo,
      isCreating,
    });

    // Act
    const { container } = render(<NewTodo />);

    fireEvent.input(screen.getByPlaceholderText('Title'), {
      target: {
        value: '',
      },
    });

    screen.debug();

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('submit'));
    });

    // Assert
    expect(createTodo).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  test('should render error message', async () => {
    // Arrange
    const data = {
      id: '1',
      title: 'test title',
    };

    const createData = undefined;
    const createTodo = jest.fn();
    const isCreating = false;

    mockCreateTodoUseCase.mockReturnValue({
      createData,
      createTodo,
      isCreating,
    });

    // Act
    const { container } = render(<NewTodo />);

    fireEvent.input(screen.getByPlaceholderText('Title'), {
      target: {
        value: '',
      },
    });

    screen.debug();

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('submit'));
    });

    // Assert
    expect(createTodo).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
    expect(ErrorMessage).toHaveBeenCalledWith(
      { name: 'title', errors: {} },
      {},
    );
  });
});
