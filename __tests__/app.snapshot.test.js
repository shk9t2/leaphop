import React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from '../App';

jest.mock('expo-status-bar', () => ({ StatusBar: () => null }));

it('App renders NavigationContainer tree', async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(<App />);
  });
  expect(tree.toJSON()).toBeTruthy();
});
