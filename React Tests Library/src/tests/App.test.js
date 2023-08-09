import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação: O primeiro link deve possuir o texto Home;', () => {
    renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: /home/i });
    expect(firstLink).toBeInTheDocument();
  });

  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação: O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const secondLink = screen.getByRole('link', { name: /about/i });
    expect(secondLink).toBeInTheDocument();
  });

  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação: O terceiro link deve possuir o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const thirdLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(thirdLink).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação;', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/digimon'); });
    const textNotFound = screen.getByRole('heading', { name: /page requested not found/i });
    expect(textNotFound).toBeInTheDocument();
  });
});
