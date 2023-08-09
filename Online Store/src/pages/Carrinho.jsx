import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Carrinho extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.atualizarCarrinho();
  }

  atualizar = () => {
    this.atualizarCarrinho();
  };

  atualizarCarrinho = () => {
    const local = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cart: local });
  };

  adicionar = (id) => {
    const local = JSON.parse(localStorage.getItem('cart'));
    const index = local.findIndex((e) => e.id === id);
    local[index].itemQuantity += 1;
    localStorage.setItem('cart', JSON.stringify(local));
    this.atualizar();
  };

  diminuir = (id) => {
    const local = JSON.parse(localStorage.getItem('cart'));
    const index = local.findIndex((e) => e.id === id);
    if (local[index].itemQuantity === 1) {
      local[index].itemQuantity = 1;
    } else {
      local[index].itemQuantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(local));
    this.atualizar();
  };

  remover = (id) => {
    const local = JSON.parse(localStorage.getItem('cart'));
    const filtered = local.filter((e) => e.id !== id);
    localStorage.setItem('cart', JSON.stringify(filtered));
    this.atualizar();
  };

  render() {
    const { cart } = this.state;
    const retorno = localStorage.getItem('cart');
    const verifica = retorno !== null;

    return (
      <div>
        { verifica ? cart.map(({ title, price, id, thumbnail, itemQuantity }) => (
          <div key={ id }>
            <h1 data-testid="shopping-cart-product-name">{ title }</h1>
            <span data-testid="product-detail-price">{ price }</span>
            <h4 data-testid="shopping-cart-product-quantity">{ itemQuantity }</h4>
            <img src={ thumbnail } alt="" />
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => this.adicionar(id) }
            >
              +
            </button>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ () => this.diminuir(id) }
            >
              -
            </button>
            <button
              type="button"
              data-testid="remove-product"
              onClick={ () => this.remover(id) }
            >
              x
            </button>
          </div>
        )) : (
          <div data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </div>)}

        <Link
          data-testid="checkout-products"
          type="button"
          to="/checkout"
        >
          Finalizar Compra
        </Link>
      </div>
    );
  }
}
export default Carrinho;
