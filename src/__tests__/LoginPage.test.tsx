import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '@/app/login/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    localStorage.clear();
  });

  it('shows error for invalid credentials', () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong' } });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('redirects on valid login', () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'admin123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(localStorage.getItem('token')).toBeTruthy();
    expect(pushMock).toHaveBeenCalledWith('/dashboard');
  });
});