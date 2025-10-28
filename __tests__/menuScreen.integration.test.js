import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuScreen from '../screens/MenuScreen';

describe('MenuScreen (web compatible)', () => {
  it('navigates to Game and Settings on button press', () => {
    const navigate = jest.fn();

    render(<MenuScreen navigation={{ navigate }} />);

    // Проверяем наличие кнопок
    expect(screen.getByText(/начать игру/i)).toBeInTheDocument();
    expect(screen.getByText(/настройки/i)).toBeInTheDocument();

    // Симулируем нажатия
    fireEvent.click(screen.getByText(/начать игру/i));
    expect(navigate).toHaveBeenCalledWith('Game');

    fireEvent.click(screen.getByText(/настройки/i));
    expect(navigate).toHaveBeenCalledWith('Settings');
  });
});
