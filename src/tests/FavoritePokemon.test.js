import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests of Favorite Pokemon', () => {
  test('if shows on screen the correct message', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favoriteLink);

    expect(history.location.pathname).toBe('/favorites');

    const favoriteText = screen.getByText(/no favorite pokémon found/i);

    expect(favoriteText).toBeInTheDocument();
  });
  test('if shows all the favorite pokemons', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(pokemonImg).toBeInTheDocument();

    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemon/25');

    const pokemonCheckBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(pokemonCheckBox);

    expect(pokemonCheckBox).toBeChecked();

    const favoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favoritePokemon);

    expect(history.location.pathname).toBe('/favorites');

    const favoritedPokemon = screen.getByText(/pikachu/i);

    const favoritedImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(favoritedPokemon).toBeInTheDocument();
    expect(favoritedImg).toBeInTheDocument();
  });
});
