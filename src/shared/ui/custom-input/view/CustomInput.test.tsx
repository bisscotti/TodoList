import { render, screen, fireEvent } from '@testing-library/react';
import { CustomInput } from './CustomInput';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Проверка работы CustomInput', () => {
  it('рендерит текстовое поле и обновляет значение', () => {
    const handleChangeText = vi.fn();
    render(
      <CustomInput
        placeholder='Введите текст'
        type='text'
        value='hello'
        onChangeText={handleChangeText}
      />
    );

    const input = screen.getByPlaceholderText(
      'Введите текст'
    ) as HTMLInputElement;
    expect(input.value).toBe('hello');

    fireEvent.change(input, { target: { value: 'новое значение' } });
    expect(handleChangeText).toHaveBeenCalled();
  });

  it('отображает сообщение об ошибке', () => {
    render(
      <CustomInput
        type='text'
        value=''
        onChangeText={() => {}}
        error='Ошибка!'
      />
    );
    expect(screen.getByText('Ошибка!')).toBeInTheDocument();
  });

  it('рендерит чекбокс, если тип checkbox', () => {
    render(<CustomInput type='checkbox' checked={true} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('рендерит поле ввода datetime-local', () => {
    render(
      <CustomInput
        type='datetime-local'
        value='2025-05-23T10:00'
        onChangeDate={() => {}}
      />
    );
    expect(screen.getByDisplayValue('2025-05-23T10:00')).toBeInTheDocument();
  });
});
