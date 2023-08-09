const fetchProducts = async (parameter) => {
  try {
    const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${parameter}`);
    const result = await request.json();
    return result;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
