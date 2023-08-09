import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('4. Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found;', () => {
    renderWithRouter(<NotFound />);
    const textPageNotFound = screen.getByRole('heading', { name: /page requested not found/i });
    expect(textPageNotFound).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);
    const imagePageNotFound = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(imagePageNotFound.getAttribute('src')).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
