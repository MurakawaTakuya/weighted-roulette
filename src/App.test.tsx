import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders welcome message', () => {
  render(<App name="StackBlitz" />);
  const welcomeElement = screen.getByText(/Welcome to StackBlitz's Roulette/i);
  expect(welcomeElement).toBeInTheDocument();
});
