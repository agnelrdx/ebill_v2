import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import usePostApi from 'hooks/usePostApi';
import ForgotPassword from './forgot-password';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('hooks/usePostApi');

const mockUsePostApi = usePostApi as jest.MockedFunction<typeof usePostApi>;

describe('ForgotPassword', () => {
  it('renders a forgot password form', () => {
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: false,
      apiError: false,
      _post: jest.fn(),
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
    const _postMock = jest.fn();
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: false,
      apiError: false,
      _post: _postMock,
    }));

    render(<ForgotPassword />);

    const button = screen.getByRole('button', {
      name: 'Request Reset Password',
    });
    fireEvent.click(button);

    expect(_postMock).not.toHaveBeenCalled();
  });

  it('should render alert if the api fails', () => {
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: false,
      apiError: true,
      _post: jest.fn(),
    }));

    render(<ForgotPassword />);
    const alert = screen.getByRole('alert');

    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toBe('Email does not exist. Please try again.');
  });

  it('should call the api after successful form submission', async () => {
    const _postMock = jest.fn();
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: false,
      apiError: false,
      _post: _postMock,
    }));

    render(<ForgotPassword />);
    const button = screen.getByRole('button', {
      name: 'Request Reset Password',
    });
    const inputText = screen.getByTestId('email');
    fireEvent.change(inputText, { target: { value: 'test@gmail.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(_postMock).toHaveBeenCalledWith('/api/auth/forgot-password', {
        email: 'test@gmail.com',
      });
    });
  });

  it('should disable the button and render success alert after successful form submission', () => {
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: true,
      apiError: false,
      _post: jest.fn(),
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
