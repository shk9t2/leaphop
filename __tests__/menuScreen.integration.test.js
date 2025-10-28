/**
 * Integration test: MenuScreen navigation interactions
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MenuScreen from '../screens/MenuScreen';

describe('MenuScreen (integration)', () => {
  it('navigates to Game and Settings on button press', () => {
    const navigate = jest.fn();
    const { getByText } = render(<MenuScreen navigation={{ navigate }} />);

    // Buttons contain emojis: "🎮 Начать игру", "⚙️ Настройки"
    fireEvent.press(getByText(/Начать игру/i));
    expect(navigate).toHaveBeenCalledWith('Game');

    fireEvent.press(getByText(/Настройки/i));
    expect(navigate).toHaveBeenCalledWith('Settings');
  });
});