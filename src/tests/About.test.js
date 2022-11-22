import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests of About', () => {
  test('if the page have the informations about the Pokedex', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });

    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const aboutImg = screen.getByRole('img', {
      name: /pokédex/i,
    });

    const srcAboutImg = aboutImg.src;

    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    const aboutP1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );

    const aboutP2 = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );

    expect(aboutImg).toBeInTheDocument();
    expect(srcAboutImg).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(aboutImg).toBeInTheDocument();
    expect(aboutTitle).toBeInTheDocument();
    expect(aboutP1).toBeInTheDocument();
    expect(aboutP2).toBeInTheDocument();
  });
});
