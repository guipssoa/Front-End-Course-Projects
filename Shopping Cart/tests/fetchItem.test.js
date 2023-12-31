require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

 describe('2 - Teste a função fetchItem', () => {
  it('Teste se fetchItem é uma função;', () => {
     expect(typeof fetchItem).toBe('function');
   });

  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async () => {
    const callFetch = await fetchItem('MLB1615760527');
    expect(typeof callFetch).toBe('object')
  })

 it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
   fetchItem('MLB1615760527');
   const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527'
  expect(fetch).toHaveBeenCalledWith(endPoint);
 });

 it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
   const returnFetchItem = await fetchItem('MLB1615760527')
   expect(returnFetchItem).toEqual(item);
 });

 it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
  try {
    await fetchItem();
  } catch (error) {
    expect(error).toEqual(new Error('You must provide an url'));
  }
});
});