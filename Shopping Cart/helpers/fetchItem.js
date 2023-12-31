const fetchItem = async (parameter) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${parameter}`);
    const result = await response.json(); 
    return result;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
