/**
 * Полный мок для react-native, совместимый с React 19 и Testing Library
 */
import React from 'react';

export const View = ({ children, ...props }) => <div {...props}>{children}</div>;
export const Text = ({ children, ...props }) => <span {...props}>{children}</span>;
export const TouchableOpacity = ({ children, onPress, ...props }) => (
  <button onClick={onPress} {...props}>
    {children}
  </button>
);
export const Image = ({ source, style, ...props }) => (
  <img
    src={typeof source === 'string' ? source : source?.uri || ''}
    alt=""
    {...props}
  />
);

export const StyleSheet = { create: (styles) => styles };
export const Platform = { OS: 'web' };
export const Alert = { alert: jest.fn() };
export const Linking = {
  openURL: jest.fn().mockResolvedValue(true),
  canOpenURL: jest.fn().mockResolvedValue(true),
};
export const Vibration = { vibrate: jest.fn() };
export const Dimensions = {
  get: jest.fn(() => ({ width: 1080, height: 1920 })),
};

export default {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Alert,
  Linking,
  Vibration,
  Dimensions,
};
