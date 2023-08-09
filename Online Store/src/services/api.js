export async function getCategories() {
  const resposta = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const dados = await resposta.json();
  return dados;
  // https://api.mercadolibre.com/sites/MLB/categories
}

export async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}&q=${QUERY}`;
  const resposta = await fetch(url);
  const dados = await resposta.json();
  return dados;
  //  https://api.mercadolibre.com/sites/MLB/search?q=$QUERY
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}

export async function getProductById(id) {
  const resposta = await fetch(`https://api.mercadolibre.com/items/${id}  `);
  const dados = await resposta.json();
  return dados;
}
