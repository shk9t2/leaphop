import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen (web compatible)', () => {
  it('renders title and navigates to Menu when CTA pressed', () => {
    const navigate = jest.fn();

    render(<HomeScreen navigation={{ navigate }} />);

    // Проверяем заголовок
    expect(screen.getByText(/Simple Runner/i)).toBeInTheDocument();

    // Нажимаем на кнопку
    const startButton = screen.getByText(/начать игру/i);
    fireEvent.click(startButton);

    // Проверяем, что переход вызван
    expect(navigate).toHaveBeenCalledWith('Menu');
  });
});
