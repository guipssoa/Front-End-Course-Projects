import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('5. Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon;', () => {
    renderWithRouter(<App />);
    const encounteredPokemon = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(encounteredPokemon).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNextPokemon);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez;', () => {
    renderWithRouter(<App />);
    const pokemonShow = screen.getAllByTestId('pokemon-name');
    expect(pokemonShow).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const filteredButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filteredButtons[0]).toHaveTextContent('Electric');
    expect(filteredButtons[1]).toHaveTextContent('Fire');
    expect(filteredButtons[2]).toHaveTextContent('Bug');
    expect(filteredButtons[3]).toHaveTextContent('Poison');
    expect(filteredButtons[4]).toHaveTextContent('Psychic');
    expect(filteredButtons[5]).toHaveTextContent('Normal');
    expect(filteredButtons[6]).toHaveTextContent('Dragon');
    const allButton = screen.getByRole('button', { name: /All/ });
    expect(allButton).not.toHaveAttribute('data-testid', 'pokemon-type-button');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /All/ });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
  });
});
