import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const pokemonInfoName = screen.getByText(/Pikachu/);
    const pokemonInfoType = screen.getByTestId('pokemon-type');
    const pokemonInfoWeight = screen.getByText(/Average weight: 6.0 kg/);
    const pokemonInfoImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonInfoName).toBeInTheDocument();
    expect(pokemonInfoType).toHaveTextContent(/Electric/);
    expect(pokemonInfoWeight).toBeInTheDocument();
    expect(pokemonInfoImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonInfoImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails.href.includes('/pokemon/25')).toBeTruthy();
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const textDetail = /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i;
    const pokemonDetail = screen.getByText(textDetail);
    expect(pokemonDetail).toBeInTheDocument();
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const favoritesIcon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoritesIcon);
    const favoriteImage = screen.getAllByRole('img')[1];
    expect(favoriteImage.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteImage.alt).toBe('Pikachu is marked as favorite');
  });
});
