import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests of Pokemon Details component', () => {
  test('if shows the details of the pokemons on the screen', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(detailsButton).toBeInTheDocument();
    userEvent.click(detailsButton);

    const pokemonDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });

    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });

    const pokemonSummary = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );

    expect(pokemonDetails).toBeInTheDocument();
    expect(detailsButton).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
  });
  test('if there is a section on the page with the the locations of the Pokémon', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsButton);

    const pokemonLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });

    const pokemonLocations2 = screen.getByText(/kanto viridian forest/i);

    const pokemonLocations3 = screen.getByText(/kanto power plant/i);

    const pokemonImg = screen.getAllByRole('img', {
      name: 'Pikachu location',
    });

    for (let index = 0; index < pokemonImg.length; index += 1) {
      const pokemonSrc = pokemonImg[0].src;
      const pokemonSrc2 = pokemonImg[1].src;
      expect(pokemonSrc).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(pokemonSrc2).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    }

    expect(pokemonLocations).toBeInTheDocument();
    expect(pokemonLocations2).toBeInTheDocument();
    expect(pokemonLocations3).toBeInTheDocument();
    expect(pokemonImg[0]).toBeInTheDocument();
    expect(pokemonImg[1]).toBeInTheDocument();
  });
  test('if the user can favorite a Pokemon', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsButton);

    const favoriteBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    const favoriteStar = screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favoriteStar).not.toBeInTheDocument();

    userEvent.click(favoriteBox);

    const favoriteStar2 = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    const isFavorited = screen.getByLabelText(/pokémon favoritado\?/i);

    expect(favoriteStar2).toBeInTheDocument();
    expect(favoriteBox).toBeInTheDocument();
    expect(isFavorited).toBeInTheDocument();
  });
});
