import React from 'react';
import { getByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests of Pokedex', () => {
  test('if the page has the correct heading', () => {
    renderWithRouter(<App />);

    const pokemonTitle = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });

    expect(pokemonTitle).toBeInTheDocument();
  });
  test('if show the next Pokemon on click the button', () => {
    renderWithRouter(<App />);

    const pokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(pokemonButton);
    const nextPokemon = screen.getByText(/charmander/i);

    userEvent.click(pokemonButton);
    const nextPokemon2 = screen.queryByText(/caterpie/i);

    userEvent.click(pokemonButton);
    const nextPokemon3 = screen.getByText(/ekans/i);

    userEvent.click(pokemonButton);
    const nextPokemon4 = screen.getByText(/alakazam/i);

    userEvent.click(pokemonButton);
    const nextPokemon5 = screen.getByText(/mew/i);

    userEvent.click(pokemonButton);
    const nextPokemon6 = screen.getByText(/rapidash/i);

    userEvent.click(pokemonButton);
    const nextPokemon7 = screen.getByText(/snorlax/i);

    userEvent.click(pokemonButton);
    const nextPokemon8 = screen.getByText(/dragonair/i);

    userEvent.click(pokemonButton);
    const nextPokemon9 = screen.queryByText(/pikachu/i);

    expect(nextPokemon).toBeInTheDocument();
    expect(nextPokemon2).toBeInTheDocument();
    expect(nextPokemon3).toBeInTheDocument();
    expect(nextPokemon4).toBeInTheDocument();
    expect(nextPokemon5).toBeInTheDocument();
    expect(nextPokemon6).toBeInTheDocument();
    expect(nextPokemon7).toBeInTheDocument();
    expect(nextPokemon8).toBeInTheDocument();
    expect(nextPokemon9).toBeInTheDocument();
  });
  test('if only one Pokemon is shown at a time', () => {
    renderWithRouter(<App />);

    const pokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(pokemonButton);
    const nextPokemon = screen.getByText(/charmander/i);

    const nextPokemon2 = screen.queryByText(/pikachu/i);

    expect(nextPokemon).toBeInTheDocument();
    expect(nextPokemon2).not.toBeInTheDocument();
  });
  test('if the Pokedex has the filters buttons', () => {
    renderWithRouter(<App />);

    const filterButton = screen.getAllByTestId('pokemon-type-button');

    for (let index = 0; index < filterButton.length; index += 1) {
      expect(filterButton[0]).toHaveTextContent('Electric');
      expect(filterButton[1]).toHaveTextContent('Fire');
      expect(filterButton[2]).toHaveTextContent('Bug');
      expect(filterButton[3]).toHaveTextContent('Poison');
      expect(filterButton[4]).toHaveTextContent('Psychic');
      expect(filterButton[5]).toHaveTextContent('Normal');
      expect(filterButton[6]).toHaveTextContent('Dragon');
    }

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeInTheDocument();
  });
  test('if the Pokedex has a button to reset the filter', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(allButton);

    const pikachu = screen.getByText(/pikachu/i);

    expect(pikachu).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
  });
});
