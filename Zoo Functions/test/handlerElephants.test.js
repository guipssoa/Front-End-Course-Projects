const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('Requisito 1', () => {
    expect(handlerElephants()).toBe(undefined);
  });
  it('Requisito 2', () => {
    expect(handlerElephants(0)).toBe('Parâmetro inválido, é necessário uma string');
  });
  it('Requisito 3', () => {
    expect(typeof handlerElephants('count')).toBe('number');
  });
  it('Requisito 4', () => {
    expect(handlerElephants('names')).toEqual(['Ilana', 'Orval', 'Bea', 'Jefferson']);
  });
  it('Requisito 5', () => {
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5, 11);
  });
  it('Requisito 6:', () => {
    expect(handlerElephants('popularity')).toEqual(5);
  });
  it('Requisito 7:', () => {
    expect(handlerElephants('location')).toBe('NW');
  });
});
