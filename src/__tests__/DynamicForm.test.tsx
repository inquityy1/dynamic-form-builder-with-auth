import { render, screen, fireEvent } from '@testing-library/react';
import DynamicForm from '@/components/DynamicForm';

beforeAll(() => {
    window.alert = jest.fn();
});

const schema = {
  title: 'Contact Form',
  fields: [
    { type: 'text', label: 'Name', name: 'name', required: true },
    { type: 'email', label: 'Email', name: 'email', required: true },
    { type: 'textarea', label: 'Message', name: 'message' },
  ],
};

describe('DynamicForm', () => {
  it('renders all fields from schema', () => {
    render(<DynamicForm schema={schema} onSubmit={() => {}} />);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument();
  });

  it('calls onSubmit with form data', () => {
    const mockSubmit = jest.fn();
    render(<DynamicForm schema={schema} onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Hello!' } });

    fireEvent.click(screen.getByText('Submit'));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@example.com',
      message: 'Hello!',
    });
  });
});