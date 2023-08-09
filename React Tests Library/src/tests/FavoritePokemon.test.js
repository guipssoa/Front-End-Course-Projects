import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('3. Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);
    const noFavoriteFound = screen.getByText(/No favorite pokémon found/i);
    expect(noFavoriteFound).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de Pokémon favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const checkboxFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxFavorite);
    const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemonLink);
    const favoritePokemon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoritePokemon).toBeInTheDocument();
  });
});
