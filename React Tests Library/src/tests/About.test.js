import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('2. Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexInformation = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    expect(pokedexInformation).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    renderWithRouter(<About />);
    const pokedexAboutText = screen.getByRole('heading', { name: /about pokédex/i });
    expect(pokedexAboutText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    const pokedexTextParagraph = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(pokedexTextParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    renderWithRouter(<About />);
    const pokedexAboutImage = screen.getByRole('img');
    expect(pokedexAboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
