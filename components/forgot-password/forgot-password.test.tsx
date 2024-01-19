import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import useForgotPassword from 'hooks/useForgotPassword';
import ForgotPassword from './forgot-password';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('hooks/useForgotPassword');

const mockUseForgotPassword = useForgotPassword as jest.MockedFunction<any>;

describe('ForgotPassword', () => {
  it('renders a forgot password form', () => {
    mockUseForgotPassword.mockImplementation(() => ({
      mutate: jest.fn(),
      isSuccess: false,
      isError: false,
      isPending: false,
    }));
    render(<ForgotPassword />);

    const heading = screen.getByRole('heading', {
      name: 'Forgot Password?',
    });
    const para = screen.getByText(
      `Please provide the email address that you used when you signed up for your account. We will send you an email that will allow you to reset your password.`
    );
    const inputText = screen.getByTestId('email');
    const link = screen.getByRole('link', {
      name: 'Return to Login',
    });
    const button = screen.getByRole('button', {
      name: 'Request Reset Password',
    });

    expect(heading).toBeInTheDocument();
    expect(para).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should not submit the form if the email field is empty', () => {
    const mockMutate = jest.fn();
    mockUseForgotPassword.mockImplementation(() => ({
      mutate: mockMutate,
      isSuccess: false,
      isError: false,
      isPending: false,
    }));

    render(<ForgotPassword />);

    const button = screen.getByRole('button', {
      name: 'Request Reset Password',
    });
    fireEvent.click(button);

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('should render alert if the api fails', () => {
    mockUseForgotPassword.mockImplementation(() => ({
      mutate: jest.fn(),
      isSuccess: false,
      isError: true,
      isPending: false,
    }));

    render(<ForgotPassword />);
    const alert = screen.getByRole('alert');

    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toBe('Email does not exist. Please try again.');
  });

  it('should call the api after successful form submission', async () => {
    const mockMutate = jest.fn();
    mockUseForgotPassword.mockImplementation(() => ({
      mutate: mockMutate,
      isSuccess: false,
      isError: false,
      isPending: false,
    }));

    render(<ForgotPassword />);
    const button = screen.getByRole('button', {
      name: 'Request Reset Password',
    });
    const inputText = screen.getByTestId('email');
    fireEvent.change(inputText, { target: { value: 'test@gmail.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: 'test@gmail.com',
      });
    });
  });

  it('should disable the button and render success alert after successful form submission', () => {
    mockUseForgotPassword.mockImplementation(() => ({
      mutate: jest.fn(),
      isSuccess: true,
      isError: false,
      isPending: false,
    }));

    render(<ForgotPassword />);
    const button = screen.getByRole('button', {
      name: 'Request Reset Password',
    });
    const alert = screen.getByRole('alert');

    expect(button).toBeDisabled();
    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toBe(
      'Password reset email sent. Please check your email.'
    );
  });
});
