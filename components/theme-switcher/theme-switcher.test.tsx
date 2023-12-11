import { render, screen, within, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ThemeSwitcher from './theme-switcher';

const mockSetTheme = jest.fn();

jest.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme: mockSetTheme,
  }),
}));

describe('ThemeSwitcher', () => {
  it('should render the theme switcher button', () => {
    render(<ThemeSwitcher />);

    const button = screen.getByRole('button', { name: /toggle theme/i });

    expect(button).toBeInTheDocument();
  });

  it('should open the dropdown menu when clicked', async () => {
    render(<ThemeSwitcher />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    userEvent.click(button);

    const menu = await screen.findByRole('menu');
    expect(menu).toBeInTheDocument();

    const items = within(menu).getAllByRole('menuitem');
    expect(items).toHaveLength(3);
  });

  it('should call setTheme with the selected theme when clicked', async () => {
    render(<ThemeSwitcher />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    userEvent.click(button);

    const menu = await screen.findByRole('menu');
    expect(menu).toBeInTheDocument();

    const light = screen.getByRole('menuitem', { name: /Dark/i });
    userEvent.click(light);

    waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith('Dark');
    });
  });
});
