// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
  const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

   return section;
 };

 const sectionItems = document.querySelector('.items');
 const ol = document.querySelector('.cart__items');
 const cartList = document.querySelector('ol.cart__items');

 const saveLocalStorage = () => {
  arrayLocalStorage = [];
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((parameter) => arrayLocalStorage.push(parameter.innerText));
  saveCartItems(arrayLocalStorage);
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
 // const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

 const cartItemClickRemove = (parameter) => {
  const clickItem = parameter.target;
  clickItem.parentNode.removeChild(clickItem);
  saveLocalStorage();
};

 const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickRemove);
  return li;
 };

 const addCartItems = () => {
  document.addEventListener('click', async (parameter) => {
    if (parameter.target.classList.contains('item__add')) {
      const idButton = parameter.target.parentNode.firstChild.innerText;
      const selectedButton = await fetchItem(idButton);
      const cartItem = { 
        id: selectedButton.id, 
        title: selectedButton.title, 
        price: selectedButton.price, 
      };
      const productLi = createCartItemElement(cartItem);
      ol.appendChild(productLi);
    }
    saveLocalStorage();
  });
};

const addLoading = () => {
  const container = document.querySelector('.container');
  const loadingElement = document.createElement('p');
  loadingElement.setAttribute('class', 'loading');
  loadingElement.innerText = 'Carregando...';
  container.appendChild(loadingElement);
};

const removeLoading = () => {
  const loadingElement = document.querySelector('.loading');
  loadingElement.remove();
};

const clearCartButton = () => {
  const clearButton = document.querySelector('.empty-cart');
  clearButton.addEventListener('click', () => {
      cartList.innerHTML = '';
      localStorage.clear();
    });
};

window.onload = async () => {
  addLoading(); 
  const products = await fetchProducts();
  products.results.forEach((product) => {
    sectionItems.appendChild(createProductItemElement(product));
  });
  removeLoading();
  addCartItems();
  clearCartButton();
};
