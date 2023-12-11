import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import usePostApi from 'hooks/usePostApi';
import Login from './login';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('hooks/usePostApi');

const mockUsePostApi = usePostApi as jest.MockedFunction<typeof usePostApi>;

describe('Login', () => {
  it('renders a login form', () => {
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: false,
      apiError: false,
      _post: jest.fn(),
    }));
    render(<Login />);

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
    const _postMock = jest.fn();
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: false,
      apiError: false,
      _post: _postMock,
    }));

    render(<Login />);

    const button = screen.getByRole('button', {
      name: 'Login',
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

    render(<Login />);
    const alert = screen.getByRole('alert');

    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toBe(
      'Invalid email or password. Please try again.'
    );
  });

  it('should call the api after successful form submission', async () => {
    const _postMock = jest.fn();
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: false,
      apiError: false,
      _post: _postMock,
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
      expect(_postMock).toHaveBeenCalledWith('/api/auth/login', {
        email: 'test@gmail.com',
        password: '12345',
      });
    });
  });
});
