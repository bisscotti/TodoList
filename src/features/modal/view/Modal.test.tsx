import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';
import { vi } from 'vitest';

describe('Modal (Модальное окно)', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      isOpen: true,
      onClose: vi.fn(),
      title: 'Тестовое модальное окно',
      inputTitle: '',
      inputDesc: '',
      setInputTitle: vi.fn(),
      setInputDesc: vi.fn(),
      onApply: vi.fn(),
      deadline: undefined,
      setDeadline: vi.fn(),
      ...props,
    };

    return render(<Modal {...defaultProps} />);
  };

  it('не отображается, если isOpen = false', () => {
    const { container } = render(<Modal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('отображает заголовок и поля', () => {
    setup();
    expect(screen.getByText('Тестовое модальное окно')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Input your title...')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Add description...')
    ).toBeInTheDocument();
    expect(screen.getByText('Select deadline:')).toBeInTheDocument();
  });

  it('вызывает onClose при клике по фону', () => {
    const onClose = vi.fn();
    setup({ onClose });

    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('показывает ошибки валидации при пустых полях', () => {
    setup();
    fireEvent.click(screen.getByText('Apply'));
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(
      screen.getByText('Deadline requires date and time')
    ).toBeInTheDocument();
  });

  it('вызывает onApply при корректных данных', () => {
    const onApply = vi.fn();
    setup({
      inputTitle: 'Заголовок',
      inputDesc: 'Описание',
      deadline: new Date(),
      onApply,
    });
    fireEvent.click(screen.getByText('Apply'));
    expect(onApply).toHaveBeenCalled();
  });

  it('отображает createdAt и дату дедлайна', () => {
    const date = new Date('2025-05-24T12:00');
    setup({
      createdAt: date,
      deadline: date,
    });

    expect(screen.getByText(/Created at:/)).toBeInTheDocument();
    expect(screen.getByText(/Deadline:/)).toBeInTheDocument();
  });
});
