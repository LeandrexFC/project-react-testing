import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests of Not Found', () => {
  test('if the page have the corrects texts', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/unknow');
    });

    const errorTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    const errorImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    const errorSrc = errorImg.src;

    expect(errorTitle).toBeInTheDocument();
    expect(errorImg).toBeInTheDocument();
    expect(errorSrc).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
