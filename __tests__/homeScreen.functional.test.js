/**
 * Functional-style test: HomeScreen basic render and CTA
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen (functional)', () => {
  it('renders title and navigates to Menu when CTA pressed', () => {
    const navigate = jest.fn();
    const { getByText } = render(<HomeScreen navigation={{ navigate }} />);

    expect(getByText(/Simple Runner/i)).toBeTruthy();

    // Press the primary CTA button (text may include emoji or be "Перейти в меню")
    // We look for any button-like text that mentions "Меню"
    const cta = getByText(/Начать игру/i);
    fireEvent.press(cta);
    expect(navigate).toHaveBeenCalledWith('Menu');
  });
});