const saveCartItems = (parameter) => {
  const localStorageKey = 'cartItem';
  localStorage.setItem(localStorageKey, JSON.stringify(parameter));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
