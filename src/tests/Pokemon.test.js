import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests of Pokemon component', () => {
  test('if renders a card with the informations of a specify Pokemon', () => {
    renderWithRouter(<App />);

    const correctPokemon = screen.getByText(/pikachu/i);

    const correctType = screen.getByTestId('pokemon-type');

    const pokemonWeigth = screen.getByText(/average weight: 6\.0 kg/i);

    const pokemonImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    const pokemonSrc = pokemonImg.src;

    expect(pokemonWeigth).toBeInTheDocument();
    expect(correctPokemon).toBeInTheDocument();
    expect(correctType).toHaveTextContent('Electric');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonSrc).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('if the card of the Pokemon has the correct link', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(link).toBeInTheDocument();
  });
  test('if on click in the link, the user is redirected', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const link = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(link);

    expect(history.location.pathname).toBe('/pokemon/25');
  });
  test('if exists an icon of a star on the favorites Pokemons', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsButton);

    const checkPokemon = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(checkPokemon);

    const starImg = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    const starSrc = starImg.src;

    expect(starImg).toBeInTheDocument();
    expect(starSrc).toBe('http://localhost/star-icon.svg');
  });
});
