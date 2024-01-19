import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useLogin from 'hooks/useLogin';
import Login from './login';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('hooks/useLogin');

const mockUseLogin = useLogin as jest.MockedFunction<any>;

describe('Login', () => {
  it('renders a login form', () => {
    mockUseLogin.mockImplementation(() => ({
      mutate: jest.fn(),
      isSuccess: false,
      isError: false,
      isPending: false,
    }));
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    render(<Login />, { wrapper });

    const img = screen.getByRole('img', {
      name: /Ebill/i,
    });
    const heading = screen.getByRole('heading', {
      name: /Welcome to Ebill/i,
    });
    const subHeading = screen.getByText('Please sign-in to your account');
    const inputText = screen.getByTestId('email');
    const inputPassword = screen.getByTestId('password');
    const link = screen.getByRole('link', {
      name: 'Forgot Password?',
    });
    const button = screen.getByRole('button', {
      name: 'Login',
    });

    expect(img).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(subHeading).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should not submit the form if the required fields are empty', () => {
    const mockMutate = jest.fn();
    mockUseLogin.mockImplementation(() => ({
      mutate: mockMutate,
      isSuccess: false,
      isError: false,
      isPending: false,
    }));

    render(<Login />);

    const button = screen.getByRole('button', {
      name: 'Login',
    });
    fireEvent.click(button);

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('should render alert if the api fails', () => {
    mockUseLogin.mockImplementation(() => ({
      mutate: jest.fn(),
      isSuccess: false,
      isError: true,
      isPending: false,
    }));

    render(<Login />);
    const alert = screen.getByRole('alert');

    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toBe(
      'Invalid email or password. Please try again.'
    );
  });

  it('should call the api after successful form submission', async () => {
    const mockMutate = jest.fn();
    mockUseLogin.mockImplementation(() => ({
      mutate: mockMutate,
      isSuccess: false,
      isError: false,
      isPending: false,
    }));

    render(<Login />);
    const button = screen.getByRole('button', {
      name: 'Login',
    });
    const inputText = screen.getByTestId('email');
    const inputPassword = screen.getByTestId('password');
    fireEvent.change(inputText, { target: { value: 'test@gmail.com' } });
    fireEvent.change(inputPassword, { target: { value: '12345' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: 'test@gmail.com',
        password: '12345',
      });
    });
  });
});
