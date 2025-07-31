import { render, screen, fireEvent } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('DashboardPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('redirects if no token', () => {
    localStorage.removeItem('token');
    render(<DashboardPage />);
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  it('adds new form when Add New Form clicked', () => {
    localStorage.setItem('token', 'test');
    render(<DashboardPage />);

    expect(screen.getByText('Form #1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('+ Add New Form'));

    expect(screen.getByText('Form #2')).toBeInTheDocument();
  });
});