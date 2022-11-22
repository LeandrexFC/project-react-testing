import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests of App', () => {
  test('If the first link have the text Home', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });

    const pokemonLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(pokemonLink).toBeInTheDocument();
  });
  test('whether the application is redirected to the home page, when clicking on the Home link', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });
  test('whether the application is redirected to the About, when clicking on the About link', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });

    expect(history.location.pathname).toBe('/');

    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });
  test('whether the application is redirected to the favorites Pokemon, when clicking on the favorites link', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(history.location.pathname).toBe('/');

    userEvent.click(pokemonLink);

    expect(history.location.pathname).toBe('/favorites');
  });
  test('whether the application is redirected to the page Not Found, when access a unknow Url', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/unknow');
    });

    const errorTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    const errorImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(errorTitle).toBeInTheDocument();
    expect(errorImg).toBeInTheDocument();
  });
});
