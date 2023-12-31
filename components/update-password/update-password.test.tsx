import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import usePostApi from 'hooks/usePostApi';
import UpdatePassword from './update-password';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('hooks/usePostApi');

const mockUsePostApi = usePostApi as jest.MockedFunction<typeof usePostApi>;

describe('UpdatePassword', () => {
  it('renders a update password form', () => {
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: false,
      apiError: false,
      _post: jest.fn(),
    }));
    render(<UpdatePassword />);

    const heading = screen.getByRole('heading', {
      name: 'Update Password',
    });
    const para = screen.getByText(
      `Please update your password. The password must be a minimum of 6 characters long and include a combination of an uppercase letter, a lowercase letter, a special character, and a numeric digit.`
    );
    const password = screen.getByTestId('password');
    const newPassword = screen.getByTestId('newPassword');
    const link = screen.getByRole('link', {
      name: 'Return to Login',
    });
    const button = screen.getByRole('button', {
      name: 'Update Password',
    });

    expect(heading).toBeInTheDocument();
    expect(para).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(newPassword).toBeInTheDocument();
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

    render(<UpdatePassword />);

    const button = screen.getByRole('button', {
      name: 'Update Password',
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

    render(<UpdatePassword />);
    const alert = screen.getByRole('alert');

    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toBe('System error. Please try again.');
  });

  it('should call the api after successful form submission', async () => {
    const _postMock = jest.fn();
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: false,
      apiError: false,
      _post: _postMock,
    }));

    render(<UpdatePassword />);
    const button = screen.getByRole('button', {
      name: 'Update Password',
    });
    const password = screen.getByTestId('password');
    const newPassword = screen.getByTestId('newPassword');
    fireEvent.change(password, { target: { value: '!Hello123' } });
    fireEvent.change(newPassword, { target: { value: '!Hello123' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(_postMock).toHaveBeenCalledWith('/api/auth/update-password', {
        password: '!Hello123',
      });
    });
  });

  it('should disable the button and render success alert after successful form submission', () => {
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: true,
      apiError: false,
      _post: jest.fn(),
    }));

    render(<UpdatePassword />);
    const button = screen.getByRole('button', {
      name: 'Update Password',
    });
    const alert = screen.getByRole('alert');

    expect(button).toBeDisabled();
    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toBe(
      'Password updated successfully. Please login now.'
    );
  });

  it('should validate the password policy', async () => {
    const _postMock = jest.fn();
    mockUsePostApi.mockImplementation(() => ({
      apiSuccess: false,
      apiError: false,
      _post: _postMock,
    }));

    render(<UpdatePassword />);
    const button = screen.getByRole('button', {
      name: 'Update Password',
    });
    const password = screen.getByTestId('password');
    const newPassword = screen.getByTestId('newPassword');

    // Only lower case
    fireEvent.change(password, { target: { value: 'hello' } });
    fireEvent.change(newPassword, { target: { value: 'hello' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(_postMock).not.toHaveBeenCalled();
    });

    // Upper case + lower case
    fireEvent.change(password, { target: { value: 'Hello' } });
    fireEvent.change(newPassword, { target: { value: 'Hello' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(_postMock).not.toHaveBeenCalled();
    });

    // Upper case + lower case + special character
    fireEvent.change(password, { target: { value: '!Hello' } });
    fireEvent.change(newPassword, { target: { value: '!Hello' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(_postMock).not.toHaveBeenCalled();
    });

    // Upper case + lower case + special character + numeric digit
    fireEvent.change(password, { target: { value: '!Hello123' } });
    fireEvent.change(newPassword, { target: { value: '!Hello1234' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(_postMock).not.toHaveBeenCalled();
    });

    // Upper case + lower case + special character + numeric digit + match confrim password + lower than 6 characters
    fireEvent.change(password, { target: { value: '!He1' } });
    fireEvent.change(newPassword, { target: { value: '!He1' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(_postMock).not.toHaveBeenCalled();
    });

    // All validation passed
    fireEvent.change(password, { target: { value: '!Hello123' } });
    fireEvent.change(newPassword, { target: { value: '!Hello123' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(_postMock).toHaveBeenCalled();
    });
  });
});
